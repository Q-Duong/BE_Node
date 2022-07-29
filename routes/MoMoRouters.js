const {Router} = require('express');
const exportOrderService = require('../services/ExportOrderService');
const paymentService = require('../services/PaymentService');

const config = process.env;
const router = Router({ mergeParams: true })

router
.post('/notification', async (req, res) => {
    try {
        console.log(req.body)
        const body = req.body
        const partnerCode = config.PARTNER_CODE;
        const accessKey = config.ACCESS_KEY;
        const secretkey = config.SECRET_KEY;
        const orderId = body.orderId;
        const requestId = body.requestId;
        const orderInfo = body.orderInfo;
        const amount = body.amount;
        const orderType = body.orderType
        const transId = body.transId
        const resultCode = body.resultCode
        const message = body.message
        const payType = body.payType
        const responseTime = body.responseTime
        const extraData = body.extraData

        //before sign HMAC SHA256 with format
        //accessKey=$accessKey&amount=$amount&extraData=$extraData&ipnUrl=$ipnUrl&orderId=$orderId&orderInfo=$orderInfo&partnerCode=$partnerCode&redirectUrl=$redirectUrl&requestId=$requestId&requestType=$requestType
        const rawSignature = "accessKey="+accessKey+"&amount=" + amount+"&extraData=" + extraData+ "&message="+ message +"&orderId=" + orderId+"&orderInfo=" + orderInfo+"&orderType="+orderType+"&partnerCode=" + partnerCode +"&payType=" + payType+"&requestId=" + requestId+"&responseTime="+responseTime+"&resultCode=" + resultCode+"&transId="+transId
        //puts raw signature
    
        //signature
        const crypto = require('crypto');
        const signature = crypto.createHmac('sha256', secretkey)
            .update(rawSignature)
            .digest('hex');
            console.log(signature)
            console.log(body.signature)
        if (signature == body.signature && body.resultCode == 0) {
            const exportOrder = await exportOrderService.updateStatus(orderId,"Đơn hàng mới/ĐTT")
            const payment = await paymentService.update(extraData,{status:"success",momoId:transId})
            console.log(payment)

            return res.status(200).end()
        } else {
            return res.status(400).end()
        }

    } catch (error) {
        return res.status(500).end()
    }
})

module.exports = {router}