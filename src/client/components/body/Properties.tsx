import React, { useState, useEffect } from 'react';
import PropertyList from '../reused/PropertyList';
import SearchBar, { Tab } from '../reused/SearchBar';
import Pagenation from '../reused/Pagenation';

const Properties = (props: any) => {
    const search = props.location.search;
    const [currentPage, setCurrentPage] = useState(1);
    const [total, setTotal] = useState(null);


    const changePage = (event: React.ChangeEvent<unknown>, page: number) => {
        setCurrentPage(page);
    }

    const totalPages = (thePages: string) => {
        setTotal(thePages);
    }

    const detectChange = () => {
        setCurrentPage(1);
    }



    return (
        <React.Fragment>
            <div className="properties">
                <SearchBar detectChange={detectChange} default={Tab.BUY} buttons={[Tab.BUY]} />
                <div style={{ marginLeft: "auto", marginRight: "auto", marginBottom: "30px", marginTop: "10px", display: "table" }}><Pagenation totalPages={total} currentPage={currentPage} changePage={changePage} /></div>

                <PropertyList totalPages={totalPages} currentPage={currentPage} search={search} />

                <div style={{ marginLeft: "auto", marginRight: "auto", marginBottom: "30px", marginTop: "10px", display: "table" }}><Pagenation totalPages={total} currentPage={currentPage} changePage={changePage} /></div>
            </div>
        </React.Fragment>
    )
}

export default Properties;