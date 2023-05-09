const _checkNumlessthen10Promise = (num) => {
    return new Promise((resolve, reject) => {
        if (num > 11) return reject(`${num} is greater than 10`);
        return resolve(`pass : ${num} is < than 10`);

    })
}

const _checkNumlessthen11Promise = (num) => {
    return new Promise((resolve, reject) => {
        if (num > 11) return reject(`${num} is greater than 11`);
        return resolve(`pass : ${num} is < than 11`);
    })
}

const _checkNumlessthen12Promise = (num) => {
    return new Promise((resolve, reject) => {
        if (num > 12) return reject(`${num} is greater than 12`);
        return resolve(`pass : ${num} is < than 12`);
    })
}


const handleAsyncAwaitPromise = async (req, res) => {
    const num = req.query.num ? parseInt(req.query.num) : null;
    if (!num) return res.send("Bad Request");

    try {
        //respones in  13.683ms
        let result_1 = await _checkNumlessthen10Promise(num).then(data => data).catch(err => { console.log("err : ", err); return err; });
        let result_2 = await _checkNumlessthen11Promise(num).then(data => data).catch(err => { console.log("err : ", err); return err; });
        let result_3 = await _checkNumlessthen12Promise(num).then(data => data).catch(err => { console.log("err : ", err); return err; });
        return res.send({ result_1, result_2, result_3 });
    } catch (err) {
        res.send({ err })
        console.log("errhandleAsyncAwaitPromise : ", err);
    }
}
const handleAsyncAwaitPromiseAll = async (req, res) => {
    const num = req.query.num ? parseInt(req.query.num) : null;
    if (!num) return res.send("Bad Request");

    try {
        //respones in 
        const [result_1, result_2, result_3] = await Promise.all([
            _checkNumlessthen10Promise(num),
            _checkNumlessthen11Promise(num),
            _checkNumlessthen12Promise(num)
        ]);

        return res.send({ result_1, result_2, result_3 });
    } catch (err) {
        res.send({ err });
        console.log("errhandleAsyncAwaitPromiseAll : ", err);
    }
}

const handleAsyncAwait = async (req, res) => {
    const num = req.query.num ? parseInt(req.query.num) : null;
    if (!num) return res.send("Bad Request");

    try {
        //response in 16.533 ms
        let result_1 = await _checkNumlessthen10Promise(num);
        let result_2 = await _checkNumlessthen11Promise(num);
        let result_3 = await _checkNumlessthen12Promise(num);

        return res.send({
            result_1, result_2, result_3
        });
    } catch (err) {
        res.send({ err });
        console.log("errhandleAsyncAwait : ", err);
    }
}

module.exports = {
    handleAsyncAwait,
    handleAsyncAwaitPromise,
    handleAsyncAwaitPromiseAll
}