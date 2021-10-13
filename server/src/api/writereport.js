import token from '../util/token';
import {Report} from '../user/model';

export default {
    write : (req, res, next) => {
        const { date, title, content } = req.body;

        if (!date || !title || !content) {
            return res
                .status(422)
                .send({error: 'You must provide three items.'});
        }
        Report
            // .findOne({
            //     date: date
            // }, function (err, existingUser) {
            //     if (err) return res.status(422).send(err);
            //     if (existingUser) {
            //         return res
            //             .status(422)
            //             .send({error: 'The date was added'});
            //     }
            console.log(date,title,content);
                const report = new Report({
                    date: date,
                    title: title,
                    content: content
                })

                report.save(function (err, savedUser) {
                    if (err) {
                        return next(err)
                    }

                    res.json({
                        success: true,
                        token: token.generateToken(savedUser)
                    })
                })
            // })
    },

    // This section will help you get a list of all the records.
    record : (req, res) => {
        Report
            .find(
            {}, function (err, result) {
                if (err) return res.status(422).send(err);
                res.json(result)
            })
        
    },

    // This section will help you delete a record
    delete : (req, res) => {
        Report
            .deleteOne({
                _id: req.params.id
            }, function (err, obj) {
                if (err) return res.status(422).send(err);
                console.log("1 document deleted");
                res.status(obj);
            })
    },

    // This section will help you get a single record by id
    getrecord : (req, res) => {
        Report
            .findOne({
                _id: req.params.id
            }, function (err, result) {
                if (err) return res.status(422).send(err);
                res.json(result);
            })
    },
    
    update : (req, res, next) => {
        const { date, title, content } = req.body;
        // console.log("####################%%%%%%%%%%%%%@@@@@@@@@@@@@");
        if (!date || !title || !content) {
            return res
                .status(422)
                .send({error: 'You must provide three items.'});
        }
        
        Report
            .updateOne({
                _id: req.params.id
                }, {
                    $set: {date: date, title: title, content: content,}
                }, function (err, result) {
                    if (err) {
                        return next(err)
                    }
                    
                    res.json({
                        success: true,
                        token: token.generateToken(result)
                    })

            })
    }
}
