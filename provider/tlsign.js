var uuid = require('node-uuid');

module.exports=function () {

    var tlsign = {};
    tlsign.trans_id =uuid.v4();
    tlsign.id_card = '41142319840322451X';
    tlsign.id_name ='黄建博';
    tlsign.bank_account = '6228480405925338270';
    tlsign.phone='18551276587';
    tlsign.merchant_no = '200604000000445';
    tlsign.status = 30;
    tlsign.bank_code='0103';
    tlsign.bank_name='农业银行';
    tlsign.return_code = '0';
    tlsign.return_msg = '未处理';
    //tlsign.extension_info='{"loginPassword":"`12qwe","loginUserName":"20060400000044502","pubCertName":"allinpay-pds.cer","privateCertName":"20060400000044502.p12","privateCertPassword":"111111"}';
    //tlsign.batch_flag ='';
    tlsign.remark = 'data';
    //tlsign.agreement_no = '';
    //tlsign.notify_to = '';
    //tlsign.channel_return_code = '';
    //tlsign.channel_return_msg = '';

    return tlsign;
};