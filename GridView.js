class GridView {
    /**
     * properties 
     * @param [array] _tableClass - css classes
     * @param [array] data - output data
     * @param [array] attribute - control output from data
     * @param [array] _element - table placement
     * @param [array] _header - table header
     * @param [array] _headerClass - table header css classes
     */

    constructor() {
        this._header = '';
        this._headerClass = [];
        this._tableClass = [];
        this._element = '.container';
        this.attribute = [];
    }

    /**
     * Method for setting header
     */

    setHeader(header) {
        if (typeof header === 'string' && header.trim() != '') {
            this._header = header.trim();
            return true;
        }
        return false;
    }

    /**
     * Method for setting classes
     */

    setHeaderClass(headerClass) {
        if (typeof headerClass === 'object') {
            this._headerClass = headerClass;
            return true;
        }
        return false;
    }

    /**
     * Method for setting element
     */

    setElement(element) {
        let elemExist = document.querySelector(element);
        if (elemExist) {
            this._element = elemExist;
            return true;
        }
        return false;
    }

    /**
     * Method for showing GridViewTable
     */

    render(data) {
        this.setElement(data.element);
        this.setHeaderClass(data.headerClass);
        this.attribute = data.attribute;
        this.setHeader(data.header);
        this.data = data.data;

        //show header

        if (this._header) {
            const header = document.createElement('h1');
            header.textContent = this._header;
            this._headerClass.forEach(cssClass => {
                header.classList.add(cssClass);
            });
            document.querySelector(this._element).append(header);
        }
        //show table
        const table = document.createElement('table');
        this._tableClass.forEach(cssClass => {
            table.classList.add(cssClass);
        });

        // create table header

        let trHeader = document.createElement('tr');
        for (let key in this.attribute) {
            let th = document.createElement('th');
            if (this.attribute[key].label) {
                th.textContent = this.attribute[key].label;
            } else {
                th.textContent = key;
            }
            trHeader.append(th);
        }
        table.append(trHeader);

        // draw table 

        for (let i = 0; i < this.data.length; i++) {
            let dataArr = this.data[i]; // one string of data
            let tr = document.createElement('tr');
            for (let key in this.attribute) {
                let td = document.createElement('td');
                let value = dataArr[key];
                if (this.attribute[key].value) {
                    value = this.attribute[key].value(dataArr);
                }
                if (this.attribute[key].src) {
                    td.innerHTML = value;
                } else {
                    td.textContent = value;
                }
                tr.append(td);
            }
            table.append(tr);
        }
        document.querySelector(this._element).append(table);
    }
}