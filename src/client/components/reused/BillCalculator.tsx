import React, { useState, useEffect } from 'react';
import Chart from '../reused/Chart';
import TextField from "@material-ui/core/TextField";


type Props = {
    homePrice?: string,
    downPayment?: string,
    downPaymentPercent?: string,
    tax?: string,
    hoa?: string,

}

const BillCalculator = (props: Props) => {

    const [homePrice, setHomePrice] = useState(props.homePrice || "839900");
    const [downPayment, setDownPayment] = useState("0");
    const [downPaymentPercent, setDownPaymentPercent] = useState("20"); //%
    const [interestRate, setInterestRate] = useState("3.159"); //%
    const [mortgageTerm, setMortgageTerm] = useState("30"); //dropdown 30 15
    const [tax, setTax] = useState(props.tax || "594");
    const [insurance, setInsurance] = useState("219");
    const [HOA, setHOA] = useState(props.hoa || "0");


    useEffect(() => {
        //Set the initial downPayment based on the percentage
        setDownPayment((parseFloat(downPaymentPercent) / 100 * parseFloat(homePrice)).toFixed(2));

        //Double checking for bad passed values
        if (isNaN(parseFloat(HOA))) {
            setHOA("0");
        }
        if (isNaN(parseFloat(tax))) {
            setTax("0");
        }

    }, []);



    //Before you as yes using float and toFixed was the best way to store for user friendliness.

    //We set the actual state to a string. But we do the calculations with float
    function changeHomePrice(event: React.ChangeEvent<HTMLInputElement>) {
        const parsed = parseFloat((event.target.value));
        setHomePrice(event.target.value);
        setDownPayment((parseFloat(downPaymentPercent) / 100 * parsed).toFixed(2));
    }
    function changeDownPayment(event: React.ChangeEvent<HTMLInputElement>) {
        const parsed = parseFloat(event.target.value)
        setDownPayment(event.target.value);
        setDownPaymentPercent((parsed / parseFloat(homePrice) * 100).toFixed(2));
    }
    function changeDownPaymentPercent(event: React.ChangeEvent<HTMLInputElement>) {
        const parsed = parseFloat(event.target.value)
        setDownPaymentPercent(event.target.value);
        setDownPayment((parsed / 100 * parseFloat(homePrice)).toFixed(2));
    }
    function changeInterestRate(event: React.ChangeEvent<HTMLInputElement>) {
        setInterestRate(event.target.value);
    }
    function changeMortgageTerm(event: React.ChangeEvent<HTMLInputElement>) {
        setMortgageTerm(event.target.value);
    }
    function changeTax(event: React.ChangeEvent<HTMLInputElement>) {
        setTax(event.target.value);
    }
    function changeInsurance(event: React.ChangeEvent<HTMLInputElement>) {
        setInsurance(event.target.value);
    }
    function changeHOA(event: React.ChangeEvent<HTMLInputElement>) {

        setHOA(event.target.value);
    }



    let r = (parseFloat(interestRate) / 100) / 12;
    let n = parseFloat(mortgageTerm) * 12;
    let P = parseFloat(homePrice) - parseFloat(downPayment);


    const calculateTotal = () => {

        return ((getOnlyPI() + parseFloat(HOA) + parseFloat(insurance) + parseFloat(tax)).toFixed(2));
    }

    const getOnlyPI = () => {
        return (P * (r * ((1 + r) ** n) / (((1 + r) ** n) - 1)))
    }
    return (
        <>
            <div className="bill-container">
                <p>Mortgage Calculator</p>

                <TextField
                    onChange={changeHomePrice}
                    label="Purchase Price ($)"
                    type="text"
                    value={homePrice}
                    variant="outlined"

                />
                <TextField
                    onChange={changeDownPayment}
                    label="Down Payment ($)"
                    type="text"
                    value={downPayment}
                    variant="outlined"
                />
                <TextField
                    onChange={changeDownPaymentPercent}
                    label="Down Payment (%)"
                    type="text"
                    value={downPaymentPercent}
                    variant="outlined"
                />
                <TextField
                    onChange={changeInterestRate}
                    label="Interest Rate (%)"
                    type="text"
                    value={interestRate}
                    variant="outlined"
                />
                <TextField
                    onChange={changeMortgageTerm}
                    label="Mortgage Term"
                    type="text"
                    value={mortgageTerm}
                    variant="outlined"
                />
                <TextField
                    onChange={changeTax}
                    label="Tax ($)"
                    type="text"
                    value={tax}
                    variant="outlined"
                />
                <TextField
                    onChange={changeInsurance}
                    label="Insurance ($)"
                    type="text"
                    value={insurance}
                    variant="outlined"
                />
                <TextField
                    onChange={changeHOA}
                    label="HOA/Other ($)"
                    type="text"
                    value={HOA}
                    variant="outlined"
                />
                <div className="mortgage-right">
                    <Chart type={"doughnut"} total={parseFloat(calculateTotal())} data={{
                        datasets: [{
                            label: "Monthly Payment",
                            data: [getOnlyPI().toFixed(2), parseFloat(tax).toFixed(2), parseFloat(insurance).toFixed(2), parseFloat(HOA).toFixed(2)],
                            backgroundColor: ['rgba(25, 99, 132, 0.7)',
                                'rgba(54, 162, 235, 0.7)',
                                'rgba(25, 206, 86, 0.7)',
                                'rgba(25, 106, 86, 0.7)']
                        }],

                        // These labels appear in the legend and in the tooltips when hovering different arcs
                        labels: [
                            'Principal and Interest',
                            'Property Tax',
                            'Home Insurance',
                            "HOA"
                        ]
                    }} />

                </div>
            </div>



        </>




    );

}
export default BillCalculator;
