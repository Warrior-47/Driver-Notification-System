class Calculate {
    static completionRate(driver_data, cb) {
        var rate = 0

        if (driver_data.length === 0) {
            rate = 0.85

        }else if (driver_data.length === 1) {
            
            if (driver_data[0].rides < 100) {
                rate = 0.85
            
            }else {
                if (driver_data[0].status === 0) {
                    rate = 0.0
                
                }else {
                    rate = 1.0
                } 
            }
        }
        
        else {
            const rides_completed = driver_data[1].rides
            const rides_accepted = rides_completed + driver_data[0].rides

            if (rides_accepted < 100) {
                rate = 0.85
            }else {
                rate = rides_completed / rides_accepted
            }
        }
    
        cb({
            "Completion_rate": rate,
            "Message": this.completion_message(rate)
        })
    }

    static ride_information(driver_data, cb) {
        var rides_cancelled = 0
        var rides_completed = 0

        if (driver_data.length === 1) {
            if (driver_data[0].status === 0) {
                rides_cancelled = driver_data[0].rides

            }else if (driver_data[0].status === 1) {
                rides_completed = driver_data[0].rides
            }

        }else {
            rides_cancelled = driver_data[0].rides
            rides_completed = driver_data[1].rides
        }

        cb({
            "rides_cancelled": rides_cancelled,
            "rides_completed": rides_completed,
            "total_rides": rides_cancelled+rides_completed
        })
    }

    static  completion_message(completion_rate) {
        if (completion_rate <= 0.5) {
            return "Your completion rate is very low. You will get suspended if you do not increase your completion rate."
        
        }else if(completion_rate <= 0.7) {
            return "Your completion rate is low. You will get less requests if you do not increase your completion rate."
        
        }else {
            return "Please complete more to get more requests."
        }
    }
}

module.exports = Calculate