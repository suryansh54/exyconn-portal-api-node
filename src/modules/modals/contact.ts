const truncateHTML = require('truncate-html');

class ReqContactQueryModel {
    incidentID: any;
    subject: any;
    description: any;
    userID: any;
    constructor(req: any) {
        this.incidentID = req.incidentID;
        this.subject = req.subject;
        this.description = req.description;
        this.userID = req.userID;
    }
}

class ContactQueryModel {
   incidentID: any;
   status: any;
    constructor(res: any) {
        this.incidentID = res.incidentID;
        this.status = res.status;
    }
}


class ContactQueryResponseModel {
    incidentID: any;
    Date: any;
    status: any;
    subject: any;
    description: any;
    constructor(res: any) {
        this.incidentID = res.incidentID;
        this.status = res.status;
        this.Date = res.Date;
        this.subject = res.subject;
        this.description = truncateHTML(res.description, 25);
    }

}

export { ContactQueryModel, ContactQueryResponseModel, ReqContactQueryModel };
