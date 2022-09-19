module.exports = class Common {

	constructor() { }

	static addslashes(string) {
		if (string == null) {
			return null;
		}
		return string.toString().replace(/\\/g, '\\\\').
			replace(/\u0008/g, '\\b').
			replace(/\t/g, '\\t').
			replace(/\n/g, '\\n').
			replace(/\f/g, '\\f').
			replace(/\r/g, '\\r').
			replace(/'/g, '\\\'').
			replace(/"/g, '\\"');
	}

	static isNotEmpty(data, str) {
		if (typeof data == 'undefined') return false;
		return typeof data[str] != 'undefined' && data[str] != '' && data[str] != 'null' && data[str] != null;
	}

	static isEmpty(data, str) {
		if (typeof data != 'undefined') {
			return !(typeof data[str] != 'undefined' && data[str] != '' && data[str] != 'null' && data[str] != null);
		}
		return true;
	}

	static isEmptyObj(obj) {
		return Object.keys(obj).length < 1;
	}

	static isEmptyArr(arr) {
		return arr.length < 1;
	}

	static errorHandler(obj) {
		if (this.isNotEmpty(obj, "sqlMessage") && obj.sqlMessage.indexOf("Duplicate") > -1) {
			return obj.sqlMessage.substr(0, obj.sqlMessage.indexOf(" for"));
		} else if (this.isNotEmpty(obj, "sqlMessage") && obj.sqlMessage.indexOf("SQL syntax") > -1) {
			return "SQL syntax error: " + obj.sql;
		} else if (this.isNotEmpty(obj, "sqlMessage") && obj.sqlMessage.indexOf("database") > -1) {
			return "Database error occured";
		} else if (this.isNotEmpty(obj, 'sqlMessage')) {
			return obj.sqlMessage;
		}
		return obj;
	}

	static pad(number, n = 4) {
		if (n == undefined)
			n = 2;
		if (number.toString().length > n)
			return number;
		return (new Array(n).join('0') + number).slice(-n);
	}

	static generateCode(number, digits = 4) {
		return "GWD" + this.pad(number, digits)
	}

	static isArray(ar) {
		return Array.isArray(ar);
	}
}