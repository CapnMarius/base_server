class TestController {
    constructor(data) {
        console.log("TestController Attached");
    }

    testAction(request) {
        console.log(request.data);
        setInterval(() => {
            request.response("hoi lisa");
        }, 2000);
    }
}


let testController = null;
module.exports = data => {
    if (testController === null) {
        testController = new TestController(data);
    }
    return testController;
};