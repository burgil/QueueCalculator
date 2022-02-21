let count = 0
let firstQueue = undefined
let firstTime = undefined
let updateETA = 0
let minutesLeft = 0
let ETA_MiliSeconds = 0

document.querySelector('input').addEventListener("keyup", (e) => {
    e.target.value = e.target.value.replace(/[^0-9\.]+/g, '')
    if (e.target.value.length > 5) e.target.value = e.target.value.substring(0, 5)
})

function numberWithCommas(x) {
    return x.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ",")
}

function addQueue() {
    let today = new Date()
    currentQueue = +document.querySelector('input').value
    if (currentQueue == 0) {
        badAlert()
    } else if (firstQueue !== undefined && firstQueue == currentQueue) {
        repeatAlert()
    } else if (currentQueue < 420) {
        smallAlert()
    } else if (firstQueue !== undefined && currentQueue > firstQueue) {
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
            const queueChange = firstQueue - currentQueue
            const queueLeft = currentQueue / queueChange
            const currentTime = today.getTime()
            const timeChange = currentTime - firstTime
            ETA_MiliSeconds = queueLeft * timeChange
            const unix_timestamp = +(currentTime + ETA_MiliSeconds).toFixed(0)
            const ETA = new Date(unix_timestamp).toLocaleTimeString()
            console.log('firstQueue: ' + firstQueue)
            console.log('currentQueue: ' + currentQueue)
            console.log('queueChange: ' + queueChange)
            console.log('currentTime: ' + currentTime)
            console.log('firstTime: ' + firstTime)
            console.log('timeChange: ' + timeChange)
            console.log('queueLeft: ' + queueLeft)
            console.log('ETA_MiliSeconds: ' + ETA_MiliSeconds)
            console.log('unix_timestamp: ' + unix_timestamp)
            console.log('ETA: ' + ETA)
            console.log('------------------------------')
            if (count == 2) {
                td3.innerHTML = `<span style="color:yellow">${ETA}</span>`
            } else {
                td3.innerHTML = ETA
            }
            minutesLeft = ETA_MiliSeconds / 1000 / 60
            if (count == 2) warnAlert(true)
            goodAlert(ETA, minutesLeft, true)
            if (updateETA !== 0) {
                clearInterval(updateETA)
                updateETA = 0;
            }
            updateETA = setInterval(()=>{
                ETA_MiliSeconds -= 60000
                minutesLeft = ETA_MiliSeconds / 1000 / 60
                goodAlert(ETA, minutesLeft, false)
            }, 60000);
        } else {
            td3.innerHTML = 'Unknown yet'
            warnAlert()
        }
        tr.append(td3)
        if (count == 1) {
            firstQueue = currentQueue
            firstTime = today.getTime()
        }
        document.querySelector('input').value = ''
    }
}

function badAlert() {
    GrowlNotification.notify({
        title: 'Stupid!',
        description: 'You forgot to enter the queue moron.',
        type: 'error',
        position: 'top-right',
        closeTimeout: 4500
    })
}

function smallAlert() {
    GrowlNotification.notify({
        title: '420 ERROR',
        description: 'Can not calculate anything below 420 (;',
        type: 'error',
        position: 'top-right',
        closeTimeout: 4500
    })
}

function senseAlert(before, after) {
    GrowlNotification.notify({
        title: 'MAKES NO SENSE',
        description: 'WTF it makes no sense you went up in the queue! haha (' + `${before}->${after}` + ')',
        type: 'error',
        position: 'top-right',
        closeTimeout: 4500
    })
}

function repeatAlert() {
    GrowlNotification.notify({
        title: 'Stupid!',
        description: 'You entered the same queue number as last time moron.',
        type: 'error',
        position: 'top-right',
        closeTimeout: 4500
    })
}

function cheaterAlert() {
    GrowlNotification.notify({
        title: 'WTF!',
        description: 'How did you do that? Your queue number is wayy to high!',
        type: 'error',
        position: 'top-right',
        closeTimeout: 4500
    })
}

function devilAlert() {
    GrowlNotification.notify({
        title: 'Danger!',
        description: 'The devil may be present... your queue number is suspicious...',
        type: 'info',
        position: 'top-right',
        closeTimeout: 4500
    })
}

function weedAlert() {
    GrowlNotification.notify({
        title: 'WOW',
        description: 'You are 420 in the queue you lucky bastard!',
        type: 'info',
        position: 'top-right',
        closeTimeout: 4500
    })
}

function warnAlert(isSecond=false) {
    if (isSecond) {
        GrowlNotification.notify({
            title: 'Need <b>two</b> more!',
            description: 'Wait a bit and add one more to calculate your ETA!',
            type: 'warning',
            position: 'top-right',
            closeTimeout: 8500
        })
    } else {
        GrowlNotification.notify({
            title: 'Need one more!',
            description: 'Wait a bit and add one more to calculate your ETA!',
            type: 'warning',
            position: 'top-right',
            closeTimeout: 8500
        })
    }
}

function goodAlert(ETA, minutesLeft, showUpdate) {
    GrowlNotification.closeAll()
    const roundMinutesLeft = Math.round(minutesLeft)
    if (roundMinutesLeft > 0) {
        if (showUpdate) {
            GrowlNotification.notify({
                title: 'ETA',
                description: 'You will enter the game in ' + ETA + '<br><b>(' + roundMinutesLeft + ' minutes left)</b><br><span style="font-size:14px">* Updates every minute</span>',
                type: 'success',
                position: 'top-right',
                closeTimeout: 0
            })
        } else {
            GrowlNotification.notify({
                title: 'ETA',
                description: 'You will enter the game in ' + ETA + '<br><b>(' + roundMinutesLeft + ' minutes left)</b>',
                type: 'success',
                position: 'top-right',
                closeTimeout: 0
            })
        }
    } else {
        if (updateETA !== 0) {
            clearInterval(updateETA)
            updateETA = 0;
        }
        GrowlNotification.notify({
            title: 'Success!',
            description: 'You should be inside the game!<br><span style="font-size:14px">(probably in the next minute or so xD)</span>',
            type: 'success',
            position: 'top-right',
            closeTimeout: 0
        })
    }
}

setInterval(() => {
    document.querySelector('input').focus()
    document.getElementById('currentTime').innerHTML = new Date().toLocaleTimeString()
}, 1000)

GrowlNotification.notify({
    title: 'Welcome Adventurer!',
    description: 'Use the Add button to add your current Queue, Then wait a while and add your new Queue to know when you will be inside the game (ETA).',
    type: 'success',
    position: 'top-right',
    closeTimeout: 15500
})

setTimeout(() => {
    document.querySelector('.table-dark').classList.add('shown')
})