/*--  Проверка  --*/
var t1 = {
    id: "t1",
    name: "t1",
    level: "junior",
    courses: {
        5: {
            id: 5,
            title: "Fifth",
            rate: 3,
            role: "teacher",
            level: "junior"
        },
        1: {
            id: 1,
            title: "First",
            rate: 5,
            role: "teacher",
            level: "middle"
        }
    }
};
var d1 = {
    id: "d1",
    name: "d1",
    students: {
        s1: {
            id: "s1",
            name: "s1",
            courses: {
                1: {
                    id: 1,
                    title: "First",
                    rate: 5,
                    role: "student",
                    level: "middle"
                }
            }
        },
        s2: {
            id: "s2",
            name: "s2"
        }
    },
    teachers: {
        t1: {
            id: "t1",
            name: "t1",
            level: "junior",
            courses: {
                5: {
                    id: 5,
                    title: "Fifth",
                    rate: 3,
                    role: "teacher",
                    level: "junior"
                },
                1: {
                    id: 1,
                    title: "First",
                    rate: 5,
                    role: "teacher",
                    level: "middle"
                }
            }
        },
        t2: {
            id: "t2",
            name: "t2",
            level: "senior",
            courses: {
                1: {
                    id: 1,
                    title: "First",
                    rate: 5,
                    role: "teacher",
                    level: "middle"
                }
            }
        }
    }
};
var s1 = {
    id: "s1",
    name: "s1",
    courses: {
        1: {
            id: 1,
            title: "First",
            rate: 5,
            role: "student",
            level: "middle"
        }
    },
};
console.log(s1);
console.log(t1);
console.log(d1);
