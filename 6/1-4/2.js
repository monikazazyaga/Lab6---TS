var __assign = (this && this.__assign) || function () {
    __assign = Object.assign || function(t) {
        for (var s, i = 1, n = arguments.length; i < n; i++) {
            s = arguments[i];
            for (var p in s) if (Object.prototype.hasOwnProperty.call(s, p))
                t[p] = s[p];
        }
        return t;
    };
    return __assign.apply(this, arguments);
};
var _a, _b, _c, _d;
/*--  Проверка  --*/
var s1 = {
    id: "s1",
    name: "s1",
    courses: (_a = {},
        _a[1] = {
            id: 1,
            title: "First",
            rate: 5,
            role: "student",
            level: "middle"
        },
        _a),
};
var t1 = {
    id: "t1",
    name: "t1",
    level: "junior",
    courses: (_b = {},
        _b[5] = {
            id: 5,
            title: "Fifth",
            role: "teacher"
        },
        _b[1] = __assign(__assign({}, s1.courses[1]), { role: "teacher" }),
        _b)
};
var d1 = {
    id: "d1",
    name: "d1",
    students: (_c = {},
        _c["s1"] = s1,
        _c["s2"] = {
            id: "s2",
            name: "s2"
        },
        _c),
    teachers: (_d = {},
        _d["t1"] = __assign(__assign({}, t1), { rate: 3 }),
        _d["t2"] = {
            id: "t2",
            name: "t2",
            level: "senior",
            rate: 5
        },
        _d)
};
console.log(s1);
console.log(t1);
console.log(d1);
