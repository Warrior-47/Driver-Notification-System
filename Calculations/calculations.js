

class Calculate {
    static completionRate(data) {
        var rate = 0

        if (data.length === 1) {
            rate = 0.85

        }else {
            const rides_completed = data[1].rides
            const rides_accepted = rides_completed + data[0].rides

            if (rides_accepted < 100) {
                rate = 0.85
            }else {
                rate = rides_completed / rides_accepted
            }
        }
    
        return {
            "Completion_rate": rate,
            "Message": this.message(rate)
        }
    }

    static  message(c_rate) {
        if (c_rate <= 0.5) {
            return "Your completion rate is very low. You will get suspended if you do not increase your completion rate."
        }else if(c_rate <= 0.7) {
            return "Your completion rate is low. You will get less requests if you do not increase your completion rate."
        }else {
            return "Please complete more to get more requests."
        }
    }
}




module.exports = Calculate