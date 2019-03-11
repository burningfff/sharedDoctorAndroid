export default class AllService {
  constructor () {
    this.host = process.env.testHost
    this.fileHost = process.env.fileHost
    this.method = {
      signIn: '/user/signIn',
      signUp: '/user/signUp',
      // getOrderDetailByPatientId: '/order/findByPatientId',
      // getOrderDetailByDoctorId: '/order/findByDoctorId',
      // getTimeSlotDetail: '/timeSlot/find',
      // getTimeSlotByDoctorId: '/timeSlot/findByDoctorId',
      // deleteOrder: '/order/delete',
      // addTimeSlot: '/timeslot/add',
      // deleteTimeSlotById: '/timeSlot/delete',
      // getDoctorTable: '/doctor/findAllDoctor',
      // addOrder: '/order/add',
      // addMessage: '/message/add',
      // deleteMessage: '/message/delete',
      // getDoctorByName: '/doctor/findDoctorByName',
      getAllDepart: '/depart/findAll',
      // getAllMessage: '/message/findAll',
      updatePatientAllData:'/patient/updatePatientAllData',
      updateDoctorAllData:'/doctor/updateDoctorAllData',
      // updatePassword:'/user/changePassword',
      // getUserInfo:'/user/findByUserId',
      getPatientDetailByName: '/patient/findPatientByName',
      getDoctorDetailByName: '/doctor/findDoctorByName',
      // updatePatientImage: '/patient/updateImage',
      // updateDoctorImage: '/doctor/updateImage',
      // getPatientDetailById: '/patient/findPatientById',
      // getDoctorDetailById: '/doctor/findDoctorById',
      // blurSearchDoctor: '/doctor/findDoctorVague',
      searchDoctorByDepart: '/doctor/findDoctorByDepart',
      // checkUserName: '/user/checkUserName',
      getAllPatient: '/patient/findAllPatient',
      // deletePatientByDepart: '/patient/deleteByDepart',
      // deleteAllPatient: '/patient/deleteAll',
      // searchPatientByDepart: '/patient/findPatientByDepart',
      deletePatientById: '/patient/deletePatient',
      // addPatient: '/patient/addPatient',
      getAllDoctor: '/doctor/findAllDoctor',
      deleteAllDoctor: '/doctor/deleteAll',
      addDoctor: '/doctor/addDoctor',
      deleteDoctorById: '/doctor/deleteDoctor',
      //
      // getAllOrder: '/order/findAllOrder',
      // // deleteAllOrder: '',
      // deleteOrderList: '/order/deleteByList',
      // getOrderDetailBS: '/order/findBySN',
      // getOrderDetailBT: '/order/findByTN',
      // updateOrderDetail: '/order/update',
      //
      // addDepart: '/depart/addDepart'

      updateLocationByLocationId:'/location/updateLocationByLocationId',


      updateQualificationByQualificationId:'/qualification/updateQualificationByQualificationId',
    }
  }

  ajaxRequest (url, sendData, type, callback, contentType) {
    var result
    $.ajax({
      url: url,
      type: type || 'GET',
      contentType: contentType === undefined ? 'application/x-www-form-urlencoded' : contentType,
      data: contentType == 'application/json' ? JSON.stringify(sendData) : sendData,
      timeout: 60000,
      complete: function () {},
      success: function (data, textStatus) {
        try {
          if (callback) {
            callback(null, data)
          }
          result = data
        } catch (e) {
          console.log(e)
        }
      },
      error: function (XMLHttpRequest, textStatus, errorThrown) {
        try {
          if (callback) {
            callback(textStatus || new Error(FDPX.MSG.NET_ERROR), XMLHttpRequest)
          }
        } catch (e) {
          console.log(e)
        }
      }
    })
    return result
  }

  bizRequest (url, sendData, type, callback, contentType) {
    var result = null
    this.ajaxRequest(url, sendData, type, function (err, data) {
      if (!err) {
        if (data) {
          //成功，更新token
          if (data.status == true || data.status == '200') {
            result = data
            data.status = true
          }
          if (data.status == false || data.status !== '200') {
            console.log(data && data.message ? data.message : FDPX.MSG.NET_NO_DATA)
          }
          if (callback) {
            callback(data.status, data)
          }
        } else {
          if (callback) {
            callback(false, {message: '服务器好像出现了点问题'})
          }
        }
      } else {
        console.log('bizRequest error : ' + err)
      }
    }, contentType)
    return result
  }

  signIn(params, callback) {
    var url = this.host + this.method.signIn;
    var type = 'post';
    return this.bizRequest(url, params, type, function(isOk, data) {
      if (callback) {
        callback(isOk, data);
      }
    }, "application/json");
  }

  signUp(params, callback) {
    var url = this.host + this.method.signUp;
    var type = 'post';
    return this.bizRequest(url, params, type, function(isOk, data) {
      if (callback) {
        callback(isOk, data);
      }
    }, "application/json");
  }

//   getOrderDetailByPatientId(params, callback){
//     var url = this.host + this.method.getOrderDetailByPatientId;
//     var type = 'post';
//     return this.bizRequest(url, params, type, function(isOk, data) {
//       if (callback) {
//         callback(isOk, data);
//       }
//     }, "application/json");
//   }
//
//   getOrderDetailByDoctorId(params, callback){
//     var url = this.host + this.method.getOrderDetailByDoctorId;
//     var type = 'post';
//     return this.bizRequest(url, params, type, function(isOk, data) {
//       if (callback) {
//         callback(isOk, data);
//       }
//     }, "application/json");
//   }
//   getTimeSlotDetail(params, callback){
//     var url = this.host + this.method.getTimeSlotDetail;
//     var type = 'post';
//     return this.bizRequest(url, params, type, function(isOk, data) {
//       if (callback) {
//         callback(isOk, data);
//       }
//     }, "application/json");
//   }
//   getTimeSlotByDoctorId(params, callback){
//     var url = this.host + this.method.getTimeSlotByDoctorId;
//     var type = 'post';
//     return this.bizRequest(url, params, type, function(isOk, data) {
//       if (callback) {
//         callback(isOk, data);
//       }
//     }, "application/json");
//   }
//   deleteOrder(params,callback){
//     var url = this.host + this.method.deleteOrder;
//     var type = 'post';
//     return this.bizRequest(url, params, type, function(isOk, data) {
//       if (callback) {
//         callback(isOk, data);
//       }
//     }, "application/json");
//   }
//   addTimeSlot(params,callback){
//     var url = this.host + this.method.addTimeSlot;
//     var type = 'post';
//     return this.bizRequest(url, params, type, function(isOk, data) {
//       if (callback) {
//         callback(isOk, data);
//       }
//     }, "application/json");
//   }
//   deleteTimeSlotById(params,callback){
//     var url = this.host + this.method.deleteTimeSlotById;
//     var type = 'post';
//     return this.bizRequest(url, params, type, function(isOk, data) {
//       if (callback) {
//         callback(isOk, data);
//       }
//     }, "application/json");
//   }
//   getDoctorTable(params,callback){
//     var url = this.host + this.method.getDoctorTable;
//     var type = 'post';
//     return this.bizRequest(url, params, type, function(isOk, data) {
//       if (callback) {
//         callback(isOk, data);
//       }
//     }, "application/json");
//   }
//   addOrder(params,callback){
//     var url = this.host + this.method.addOrder;
//     var type = 'post';
//     return this.bizRequest(url, params, type, function(isOk, data) {
//       if (callback) {
//         callback(isOk, data);
//       }
//     }, "application/json");
//   }
//   getAllMessage(params,callback){
//     var url = this.host + this.method.getAllMessage;
//     var type = 'post';
//     return this.bizRequest(url, params, type, function(isOk, data) {
//       if (callback) {
//         callback(isOk, data);
//       }
//     }, "application/json");
//   }
//   addMessage(params,callback){
//     var url = this.host + this.method.addMessage;
//     var type = 'post';
//     return this.bizRequest(url, params, type, function(isOk, data) {
//       if (callback) {
//         callback(isOk, data);
//       }
//     }, "application/json");
//   }
//   updatePassword(params,callback){
//     var url = this.host + this.method.updatePassword;
//     var type = 'post';
//     return this.bizRequest(url, params, type, function(isOk, data) {
//       if (callback) {
//         callback(isOk, data);
//       }
//     }, "application/json");
//   }

  updateDoctorAllData(params,callback){
    var url = this.host + this.method.updateDoctorAllData;
    var type = 'post';
    return this.bizRequest(url, params, type, function(isOk, data) {
      if (callback) {
        callback(isOk, data);
      }
    }, "application/json");
  }

  updatePatientAllData(params,callback){
    var url = this.host + this.method.updatePatientAllData;
    var type = 'post';
    return this.bizRequest(url, params, type, function(isOk, data) {
      if (callback) {
        callback(isOk, data);
      }
    }, "application/json");
  }
//
//   getUserInfo(params,callback){
//     var url = this.host + this.method.getUserInfo;
//     var type = 'post';
//     return this.bizRequest(url, params, type, function(isOk, data) {
//       if (callback) {
//         callback(isOk, data);
//       }
//     }, "application/json");
//   }
//   updatePatientImage(params,callback){
//     var url = this.host + this.method.updatePatientImage;
//     var type = 'post';
//     return this.bizRequest(url, params, type, function(isOk, data) {
//       if (callback) {
//         callback(isOk, data);
//       }
//     }, "application/json");
//   }
//   updateDoctorImage(params,callback){
//     var url = this.host + this.method.updateDoctorImage;
//     var type = 'post';
//     return this.bizRequest(url, params, type, function(isOk, data) {
//       if (callback) {
//         callback(isOk, data);
//       }
//     }, "application/json");
//   }
//   getDoctorByName(params,callback){
//     var url = this.host + this.method.getDoctorByName;
//     var type = 'post';
//     return this.bizRequest(url, params, type, function(isOk, data) {
//       if (callback) {
//         callback(isOk, data);
//       }
//     }, "application/json");
//   }
//   blurSearchDoctor(params,callback){
//     var url = this.host + this.method.blurSearchDoctor;
//     var type = 'post';
//     return this.bizRequest(url, params, type, function(isOk, data) {
//       if (callback) {
//         callback(isOk, data);
//       }
//     }, "application/json");
//   }

  searchDoctorByDepart(params,callback){
    var url = this.host + this.method.searchDoctorByDepart;
    var type = 'post';
    return this.bizRequest(url, params, type, function(isOk, data) {
      if (callback) {
        callback(isOk, data);
      }
    }, "application/json");
  }

  getAllDepart(params,callback){
    var url = this.host + this.method.getAllDepart;
    var type = 'post';
    return this.bizRequest(url, params, type, function(isOk, data) {
      if (callback) {
        callback(isOk, data);
      }
    }, "application/json");
  }

  getPatientDetailByName(params,callback){
    var url = this.host + this.method.getPatientDetailByName;
    var type = 'post';
    return this.bizRequest(url, params, type, function(isOk, data) {
      if (callback) {
        callback(isOk, data);
      }
    }, "application/json");
  }

  getDoctorDetailByName(params,callback){
    var url = this.host + this.method.getDoctorDetailByName;
    var type = 'post';
    return this.bizRequest(url, params, type, function(isOk, data) {
      if (callback) {
        callback(isOk, data);
      }
    }, "application/json");
  }

  //   getPatientDetailById(params,callback){
//     var url = this.host + this.method.getPatientDetailById;
//     var type = 'post';
//     return this.bizRequest(url, params, type, function(isOk, data) {
//       if (callback) {
//         callback(isOk, data);
//       }
//     }, "application/json");
//   }
//   checkUserName(params,callback){
//     var url = this.host + this.method.checkUserName;
//     var type = 'post';
//     return this.bizRequest(url, params, type, function(isOk, data) {
//       if (callback) {
//         callback(isOk, data);
//       }
//     }, "application/json");
//   }
//   getDoctorDetailById(params,callback){
//     var url = this.host + this.method.getDoctorDetailById;
//     var type = 'post';
//     return this.bizRequest(url, params, type, function(isOk, data) {
//       if (callback) {
//         callback(isOk, data);
//       }
//     }, "application/json");
//   }
//   deleteMessage(params,callback){
//     var url = this.host + this.method.deleteMessage;
//     var type = 'post';
//     return this.bizRequest(url, params, type, function(isOk, data) {
//       if (callback) {
//         callback(isOk, data);
//       }
//     }, "application/json");
//   }

  getAllPatient(params,callback){
    var url = this.host + this.method.getAllPatient;
    var type = 'post';
    return this.bizRequest(url, params, type, function(isOk, data) {
      if (callback) {
        callback(isOk, data);
      }
    }, "application/json");
  }

//   deletePatientByDepart(params,callback){
//     var url = this.host + this.method.deletePatientByDepart;
//     var type = 'post';
//     return this.bizRequest(url, params, type, function(isOk, data) {
//       if (callback) {
//         callback(isOk, data);
//       }
//     }, "application/json");
//   }
//   deleteAllPatient(params,callback){
//     var url = this.host + this.method.deleteAllPatient;
//     var type = 'post';
//     return this.bizRequest(url, params, type, function(isOk, data) {
//       if (callback) {
//         callback(isOk, data);
//       }
//     }, "application/json");
//   }
//   searchPatientByDepart(params,callback){
//     var url = this.host + this.method.searchPatientByDepart;
//     var type = 'post';
//     return this.bizRequest(url, params, type, function(isOk, data) {
//       if (callback) {
//         callback(isOk, data);
//       }
//     }, "application/json");
//   }

  deletePatientById(params,callback){
    var url = this.host + this.method.deletePatientById;
    var type = 'post';
    return this.bizRequest(url, params, type, function(isOk, data) {
      if (callback) {
        callback(isOk, data);
      }
    }, "application/json");
  }

//   addPatient(params,callback){
//     var url = this.host + this.method.addPatient;
//     var type = 'post';
//     return this.bizRequest(url, params, type, function(isOk, data) {
//       if (callback) {
//         callback(isOk, data);
//       }
//     }, "application/json");
//   }

  getAllDoctor(params,callback){
    var url = this.host + this.method.getAllDoctor;
    var type = 'post';
    return this.bizRequest(url, params, type, function(isOk, data) {
      if (callback) {
        callback(isOk, data);
      }
    }, "application/json");
  }

  deleteAllDoctor(params,callback){
    var url = this.host + this.method.deleteAllDoctor;
    var type = 'post';
    return this.bizRequest(url, params, type, function(isOk, data) {
      if (callback) {
        callback(isOk, data);
      }
    }, "application/json");
  }

  addDoctor(params,callback){
    var url = this.host + this.method.addDoctor;
    var type = 'post';
    return this.bizRequest(url, params, type, function(isOk, data) {
      if (callback) {
        callback(isOk, data);
      }
    }, "application/json");
  }

  deleteDoctorById(params,callback){
    var url = this.host + this.method.deleteDoctorById;
    var type = 'post';
    return this.bizRequest(url, params, type, function(isOk, data) {
      if (callback) {
        callback(isOk, data);
      }
    }, "application/json");
  }
//
//   getAllOrder(params,callback){
//     var url = this.host + this.method.getAllOrder;
//     var type = 'post';
//     return this.bizRequest(url, params, type, function(isOk, data) {
//       if (callback) {
//         callback(isOk, data);
//       }
//     }, "application/json");
//   }
//   deleteOrderList(params,callback){
//     var url = this.host + this.method.deleteOrderList;
//     var type = 'post';
//     return this.bizRequest(url, params, type, function(isOk, data) {
//     if (callback) {
//     callback(isOk, data);
//   }
// }, "application/json");
// }
//   getOrderDetailBS(params,callback){
//     var url = this.host + this.method.getOrderDetailBS;
//     var type = 'post';
//     return this.bizRequest(url, params, type, function(isOk, data) {
//       if (callback) {
//         callback(isOk, data);
//       }
//     }, "application/json");
//   }
//   getOrderDetailBT(params,callback){
//     var url = this.host + this.method.getOrderDetailBT;
//     var type = 'post';
//     return this.bizRequest(url, params, type, function(isOk, data) {
//       if (callback) {
//         callback(isOk, data);
//       }
//     }, "application/json");
//   }
//   updateOrderDetail(params,callback){
//     var url = this.host + this.method.updateOrderDetail;
//     var type = 'post';
//     return this.bizRequest(url, params, type, function(isOk, data) {
//       if (callback) {
//         callback(isOk, data);
//       }
//     }, "application/json");
//   }
//   addDepart(params,callback){
//     var url = this.host + this.method.addDepart;
//     var type = 'post';
//     return this.bizRequest(url, params, type, function(isOk, data) {
//       if (callback) {
//         callback(isOk, data);
//       }
//     }, "application/json");
//   }

  //更新地址
  updateLocationByLocationId(params,callback){
    var url = this.host + this.method.updateLocationByLocationId;
    var type = 'post';
    return this.bizRequest(url, params, type, function(isOk, data) {
      if (callback) {
        callback(isOk, data);
      }
    }, "application/json");
  }

  //更新认证状态
  updateQualificationByQualificationId(params,callback){
    var url = this.host + this.method.updateQualificationByQualificationId;
    var type = 'post';
    return this.bizRequest(url, params, type, function(isOk, data) {
      if (callback) {
        callback(isOk, data);
      }
    }, "application/json");
  }
}
