var data = null;
class UnitController {
    test(params) {
        data = params;
        console.log(data);
    }

    test2() {
        data = "huahuah"
        console.log(data)
    }

}

export default UnitController;