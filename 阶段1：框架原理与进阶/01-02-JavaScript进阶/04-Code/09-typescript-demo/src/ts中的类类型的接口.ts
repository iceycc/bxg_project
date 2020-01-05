interface PersonInterFace{
    name: string,
    age: number,
    eat():void
}

class XiaoMing implements PersonInterFace{
    name: string = "小明";
    age: number = 18;

    eat() {
        
    }
}


class XiaoHong implements PersonInterFace{
    name: string = "小红";
    age: number = 18;

    eat() {
        
    }
}

// var xh = new XiaoHong();
// xh.name;
// xh.age;
// xh.eat();


// 数据访问层代码的
// mysql orcal mssql mongodb
// dbinteface CRUD