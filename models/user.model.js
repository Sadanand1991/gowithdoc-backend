const dbRead = require('../config/db.config').dbRead;
const Common = require("../helpers/common.helper");

module.exports = class User {

	static async get(data, req) {
		let where = ''; let order_by = ''; let select = ''; let limit = "";
		let output = {};
		if (Common.isNotEmpty(data, "limit") && Common.isNotEmpty(data, "offset")) {
			limit = ` LIMIT ${data.offset}, ${data.limit}`
		}
		if (Common.isNotEmpty(data, "search")) {
			where = " AND (u.first_name like '%" + data.search + "%' OR ";
			where += " u.last_name like '%" + data.search + "%' OR ";
			where += " u.phone like '%" + data.search + "%' OR ";
			where += " u.email like '%" + data.search + "%')";
		}
		if (Common.isNotEmpty(data, "user_id")) {
			if (data.user_id == 0) data.user_id = 1;
			where = " AND u.user_id = '" + data.user_id + "'";
		}
		if (Common.isNotEmpty(data, "email") && Common.isNotEmpty(data, "password")) {
			where = " AND u.email like '%" + data.email + "%'";
			where += " AND u.status = '1'";
			select += ", password";
		}
		if (Common.isNotEmpty(data, "column") && Common.isNotEmpty(data, "order")) {
			order_by = " ORDER BY " + data.column + " " + data.order;
		} else {
			order_by = " ORDER BY u.created_date DESC";
		}
		if (Common.isNotEmpty(data, "status") || data.status >= 0) {
			where += " AND u.status = '" + data.status + "'";
		}
		if (Common.isNotEmpty(data, "getCount")) {
			where += " AND u.user_id > 0";
		}

		let sql = `SELECT u.*, role_name
            ${select}
            FROM users u
            LEFT JOIN roles r ON r.role_id = u.role_id
            WHERE 1
            ${where}
            ${order_by}
            ${limit}
            `;

		await dbRead.execute(sql).then(([rows]) => {
			return output['result'] = rows;
		}).catch((error) => {
			throw new Error(Common.errorHandler(error))
		});

		if (data.getCount == "true") {
			let sql = `SELECT count(DISTINCT u.user_id) as total
					FROM users u
					WHERE 1
					${where}
				`;
			await dbRead.execute(sql).then(([rows]) => {
				if (rows.length)
					output["count"] = rows[0].total;
				return output;
			}).catch((error) => {
				throw new Error(Common.errorHandler(error))
			});
		}
		return output;
	}
}