let count = 0
let lastQueue = undefined
let lastTime = undefined

document.querySelector('input').addEventListener("keyup", (e) => {
    e.target.value = e.target.value.replace(/[^0-9\.]+/g, '')
    if (e.target.value.length > 5) e.target.value = e.target.value.substring(0, 5)
})

function numberWithCommas(x) {
    return x.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ",")
}

function addQueue() {
    today = new Date()
    currentQueue = +document.querySelector('input').value
    if (currentQueue == 0) {
        badAlert()
    } else if (lastQueue !== undefined && lastQueue == currentQueue) {
        repeatAlert()
    } else if (currentQueue < 420) {
        smallAlert()
    } else if (lastQueue !== undefined && currentQueue > lastQueue) {
        senseAlert()
    } else if (currentQueue > 99999) {
        cheaterAlert()
    } else {
        if (currentQueue === 420 || currentQueue === 4200) weedAlert()
        if (currentQueue === 666 || currentQueue === 6666) devilAlert()
        count += 1 // count records
        if (count == 1) document.querySelectorAll('tr')[1].remove() // clean demo
        tr = document.querySelector('tbody').insertRow(1) // insert from top
        // first
        td1 = document.createElement('td')
        td1.innerHTML = numberWithCommas(currentQueue)
        tr.append(td1)
        // second
        td2 = document.createElement('td')
        td2.innerHTML = today.toLocaleTimeString()
        tr.append(td2)
        // third
        td3 = document.createElement('td')
        if (count > 1) {
            /*
            12:25:10 - 10000
            12:35:10 - 7500
            10 minutes = 2500
            7500 / 2500 = 3 * 10 minutes = 30 minutes
            */
            const queueChange = lastQueue - currentQueue
            const currentTime = today.getTime()
            const timeChange = currentTime - lastTime
            const queueLeft = currentQueue / queueChange
            const ETA_MiliSeconds = queueLeft * timeChange
            const unix_timestamp = +(currentTime + ETA_MiliSeconds).toFixed(0)
            const ETA = new Date(unix_timestamp).toLocaleTimeString()
            console.log('lastQueue: ' + lastQueue)
            console.log('currentQueue: ' + currentQueue)
            console.log('queueChange: ' + queueChange)
            console.log('currentTime: ' + currentTime)
            console.log('lastTime: ' + lastTime)
            console.log('timeChange: ' + timeChange)
            console.log('queueLeft: ' + queueLeft)
            console.log('ETA_MiliSeconds: ' + ETA_MiliSeconds)
            console.log('unix_timestamp: ' + unix_timestamp)
            console.log('ETA: ' + ETA)
            console.log('------------------------------')
            td3.innerHTML = ETA
            goodAlert(ETA)
        } else {
            td3.innerHTML = 'Unknown yet'
            warnAlert()
        }
        tr.append(td3)
    }
    lastQueue = currentQueue
    lastTime = today.getTime()
    document.querySelector('input').value = ''
}

function badAlert() {
    GrowlNotification.notify({
        title: 'Stupid!',
        description: 'You forgot to enter the queue moron.',
        type: 'error',
        position: 'top-right',
        closeTimeout: 4000
    })
}

function smallAlert() {
    GrowlNotification.notify({
        title: '420 ERROR',
        description: 'Can not calculate anything below 420 (;',
        type: 'error',
        position: 'top-right',
        closeTimeout: 4000
    })
}

function senseAlert(before, after) {
    GrowlNotification.notify({
        title: 'MAKES NO SENSE',
        description: 'WTF it makes no sense you went up in the queue! haha (' + `${before}->${after}` + ')',
        type: 'error',
        position: 'top-right',
        closeTimeout: 4000
    })
}

function repeatAlert() {
    GrowlNotification.notify({
        title: 'Stupid!',
        description: 'You entered the same queue number as last time moron.',
        type: 'error',
        position: 'top-right',
        closeTimeout: 4000
    })
}

function cheaterAlert() {
    GrowlNotification.notify({
        title: 'WTF!',
        description: 'How did you do that? Your queue number is wayy to high!',
        type: 'error',
        position: 'top-right',
        closeTimeout: 4000
    })
}

function devilAlert() {
    GrowlNotification.notify({
        title: 'Danger!',
        description: 'The devil may be present... your queue number is suspicious...',
        type: 'info',
        position: 'top-right',
        closeTimeout: 4000
    })
}

function weedAlert() {
    GrowlNotification.notify({
        title: 'WOW',
        description: 'You are 420 in the queue you lucky bastard!',
        type: 'info',
        position: 'top-right',
        closeTimeout: 4000
    })
}

function warnAlert() {
    GrowlNotification.notify({
        title: 'Need one more!',
        description: 'Please add one more in order to find out when you will enter the game!',
        type: 'warning',
        position: 'top-right',
        closeTimeout: 8000
    })
}

function goodAlert(ETA) {
    GrowlNotification.closeAll()
    GrowlNotification.notify({
        title: 'ETA',
        description: 'You will enter the game in ' + ETA,
        type: 'success',
        position: 'top-right',
        closeTimeout: 0
    })
}