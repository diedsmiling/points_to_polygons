/**
 * Created by diedsmiling on 1/4/16.
 */

const db = require('./config/db');
db
    .query("SELECT S.id, floor, service_type_id, name, " +
        "ST_Multi(ST_Envelope(ST_Buffer(S.geom, 3000, 2))) " +
        "FROM plan.service S, plan.service_type ST " +
        "WHERE S.service_type_id IN(1,2,3,4,5,6,7,8,9,18,26) AND S.service_type_id = ST.id")
    .then((res) => {

        var lastId = 772;
        res.forEach((item) => {
            item.alt_id = ++lastId;
            db
                .query("INSERT INTO plan.room VALUES " +
                    "(${alt_id}, NULL, ${floor}, ${st_multi}, NULL, false, " +
                    "3, false, 10, 2, ${name}, NULL)", item)
                .then(() => {
                    db.query("DELETE FROM plan.service WHERE id = ${id}", item);
                });

        });
        console.log(res.length);
    });