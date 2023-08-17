export default {
  getHttpProto: function () {
    let HTTP_TYPE = "https://";
    if (location.protocol !== 'https:') {
      HTTP_TYPE = "http://";
    } else {
      HTTP_TYPE = "https://";
    }

    return HTTP_TYPE;
  },

  //For the slideshows
  getType: function (type: string) {
    let typeTemp = "";
    if (type === "2") {
      typeTemp = "leasing";
    } else if (type === "1") {
      typeTemp = "sales";
    } else if (type === "4") {
      typeTemp = "careers";
    } else if (type === "5") {
      typeTemp = "forms";
    } else if (type === "3") {
      typeTemp = "propman";
    }

    return typeTemp;
  },


  getAllSlides: function (type: string, cb: any) {

    let fullData: any = [];

    const data = {
      dir: this.getType(type),
    };

    fetch("/api/getallslides", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        Authorization: "Bearer " + localStorage.getItem("token"),
      },
      body: JSON.stringify(data),
    })
      .then((response) => {
        return response.json();
      })
      .then((data) => {
        if (data.success) {


          fullData = data.values;
          cb(fullData);
        } else {
          console.log(data);
          cb(null);
        }
      });

  },


  getDealID: function (year: Date, initial: string, dealCount: string, isCobroke: string) {



    let coBroke = ""
    if (isCobroke === "Yes") {
      coBroke = " (Co-broke)"
    }

    const yearString = new Date(year).getFullYear().toString();
    return dealCount + 1 + "-" + initial + "-" + yearString.substring(yearString.length - 2) + coBroke;
  },

  formatPhoneNumber: function (phoneNumberString: string) {
    var cleaned = ('' + phoneNumberString).replace(/\D/g, '');
    var match = cleaned.match(/^(1|)?(\d{3})(\d{3})(\d{4})$/);
    if (match) {
      var intlCode = (match[1] ? '+1 ' : '');
      return [intlCode, '(', match[2], ') ', match[3], '-', match[4]].join('');
    }
    return null;
  },

  getDay: function (date: Date) {



    if (!Number.isNaN(date.getTime()))
      return date.getMonth() + 1 + "/" + date.getDate() + "/" + date.getFullYear();
  },

  handleCalculate: (
    startDate: Date,
    endDate: Date,

    monthlyAmount: string,
    dayss: string,
  ) => {
    let endDate2 = new Date(endDate);
    let startDate2 = new Date(startDate);
    let months = (endDate2.getFullYear() - startDate2.getFullYear()) * 12;
    months -= startDate2.getMonth();
    months += endDate2.getMonth();

    months = months <= 0 ? 0 : months;
    if (new Date(endDate2.getFullYear(), endDate2.getMonth() + 1, 0).getDate() === endDate2.getDate()) {
      months += 1;
    }

    let total: number = parseFloat(monthlyAmount) * months + (parseFloat(dayss) / 30) * parseFloat(monthlyAmount);

    return [months, total];
  }

}