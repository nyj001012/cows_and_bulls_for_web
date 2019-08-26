/* global count: writable */
/* global comNum: writable */

// 숫자 설정 및 초기화 버튼을 클릭했을 때
function setup () {
  console.log('숫자를 설정하였습니다.')
  comNum = makeNum()
  console.log(comNum)

  // 횟수 초기화
  count = 0

  // 정답 확인 버튼 초기화
  document.getElementsByName('okBtn')[0].value = '확인'

  // 입력창 내용 초기화
  document.getElementById('input').value = '숫자를 입력해주세요.'

  // 입력창 활성화
  document.getElementById('input').removeAttribute('disabled')

  // 입력 버튼 활성화
  document.getElementById('okBtn').removeAttribute('disabled')

  // 표 초기화
  for (let i = 0; i < 9; i++) {
    document.getElementsByClassName('number')[i].innerHTML = ''
    document.getElementsByClassName('judgement')[i].innerHTML = ''
  }
}

// 숫자 설정
function makeNum () {
  // 난수를 저장할 변수 선언
  var resultNum = 0

  // 배열 요소 셔플하는 함수 호출
  var randSeedNumArr = shuffleArray()

  // 배열에서 앞의 4개의 수 뽑아 숫자 만들기
  var exponent = 3
  while (resultNum.toString().length < 4) {
    for (var idx = 0; idx <= 9; idx++) {
      // 천의 자리에는 0이 올 수 없음
      if (randSeedNumArr[0] === 0) {
        continue
      } else {
        resultNum += randSeedNumArr[idx] * Math.pow(10, exponent)
        exponent--

        // 지수가 0 미만이면 숫자를 다 만든 것이므로 반복 중지
        if (exponent < 0) {
          break
        }
      }
    }
  }

  // 결과 반환
  return resultNum
}

// 배열 요소 셔플
function shuffleArray () {
  // 0~9까지의 배열 선언
  var randSeedNumArr = [0, 1, 2, 3, 4, 5, 6, 7, 8, 9]

  // randSeedNumArr 배열 요소 셔플
  for (var i = randSeedNumArr.length - 1; i > 0; i--) {
    var j = Math.floor(Math.random() * (i + 1))
    var temp = randSeedNumArr[i]
    randSeedNumArr[i] = randSeedNumArr[j]
    randSeedNumArr[j] = temp
  }
  // 셔플 후의 배열 반환
  return randSeedNumArr
}

// 숫자 입력
function inputNum () {
  // 입력받은 숫자 저장
  const userNum = document.getElementById('input').value

  // compareNumAndPosition 함수 호출을 위한 숫자 분리 함수 호출
  var userNumArr = seperateUserNum(userNum)
  var comNumArr = seperateComNum()

  while (count < 9) {
    if (userNum === comNum.toString()) {
      // 표에 입력받은 수와 그에 따른 판정 입력
      document.getElementsByClassName('number')[count].innerHTML = userNum
      document.getElementsByClassName('judgement')[count].innerHTML = compareNumAndPosition(comNumArr, userNumArr)

      // 입력창 비활성화
      document.getElementById('input').setAttribute('disabled', 'disabled')

      // 입력 버튼 비활성화
      document.getElementById('okBtn').setAttribute('disabled', 'disabled')
      break
    } else {
      document.getElementsByClassName('number')[count].innerHTML = userNum
      document.getElementsByClassName('judgement')[count].innerHTML = compareNumAndPosition(comNumArr, userNumArr)
      break
    }
  }
  ++count

  // 9회 동안 못 맞췄을 경우
  if (count === 9) {
    // 입력 비활성화 후 정답 확인 버튼으로 변경
    document.getElementById('input').setAttribute('disabled', 'disabled')
    document.getElementsByName('okBtn')[0].value = '정답 확인'
  } else if (count > 9) {
    // 정답출력
    alert('정답은 ' + comNum + ' 입니다.')
  }
}

// 사용자로부터 입력받은 수 하나씩 분리
function seperateUserNum (userNum) {
  const userNumArr = []
  for (var i = 0; i < userNum.length; i++) {
    userNumArr[i] = userNum.charAt(i)
  }
  return userNumArr
}

// 컴퓨터가 만든 수 하나씩 분리
function seperateComNum () {
  const comNumArr = []
  for (var j = 0; j < comNum.toString().length; j++) {
    comNumArr[j] = comNum.toString().charAt(j)
  }
  return comNumArr
}

// 숫자 및 위치 비교
function compareNumAndPosition (comNumArr, userNumArr) {
  // S, B의 계수
  let { rankOfStrike, rankOfBall } = { rankOfStrike: 0, rankOfBall: 0 }
  for (let i = 0; i < comNumArr.length; i++) {
    for (let j = 0; j < userNumArr.length; j++) {
      // 숫자와 위치가 같을 경우 = S
      if ((i === j) && (comNumArr[i] === userNumArr[j])) {
        rankOfStrike++
        console.log(rankOfStrike + 'S')
      } else if ((i !== j) && (comNumArr[i] === userNumArr[j])) {
        // 숫자는 같지만 위치가 다를 경우 = B
        rankOfBall++
        console.log(rankOfBall + 'B')
      }
    }
  }

  // Strike도, Ball도 없으면 숫자와 위치가 모두 다르므로 O 출력
  if ((rankOfStrike === 0) && (rankOfBall === 0)) {
    return 'O'
  } else {
    // O이 없는 경우
    return (rankOfStrike + 'S ' + rankOfBall + 'B')
  }
}

// 입력창이 focus 되었을 때
function focusOnInput () {
  // 입력창 내용 삭제
  document.getElementById('input').value = ''
}

module.exports = {
  makeNum: makeNum,
  shuffledArray: shuffleArray,
  seperateUserNum: seperateUserNum
}
