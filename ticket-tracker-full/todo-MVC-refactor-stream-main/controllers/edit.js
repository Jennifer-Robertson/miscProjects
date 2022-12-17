const TicketList = require('../models/ticketlist')

module.exports = {
//     getEdit: (req, res) => {
//     const id = req.params.id;
//     TodoTask.find({}, (err, tasks) => {
//         res.render("edit.ejs", { todoTasks: tasks, idTask: id });
//     });
// },
    deleteTicket: (req, res) => {
        const id = req.params.id;
        TicketList.findByIdAndRemove(id, err => {
            if (err) return res.send(500, err);
            res.redirect("/");
        });
    },
    updateTicket: (req, res) => {
        const id = req.params.id;
        const currentStatus = req.params.status;
        const currentButtonStatus = req.params.buttonStatus;
        console.log(id, currentStatus)
        TicketList.findByIdAndUpdate(
            id,
            {
                status: currentStatus  == 'Open' ? 'Closed' : 'Open',
                buttonStatus: currentButtonStatus == 'Close' ? 'Reopen' : 'Close'
            },
            err => {
                if (err) return res.status(500).send(err);
                res.redirect("/");
            });
    }
}