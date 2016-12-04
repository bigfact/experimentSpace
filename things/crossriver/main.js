/**
 * 警察罪犯一家六口过河问题
 * @author bigfact<bigfact@foxmail.com>
 */

// 关系
var Relation = ['警察0', '罪犯1', '母亲2', '父亲3', '女儿4', '女儿5', '儿子6', '儿子7']

// 右岸
var Right = [1, 1, 1, 1, 1, 1, 1, 1]
// 左岸
var Left = [0, 0, 0, 0, 0, 0, 0, 0]

/**
 * 检查两个人是否满足乘船过河条件，警察0或者母亲2或者父亲3带着剩下人当中的一个人乘船过河
 */
function canGo(persion0, persion1) {
	var tmp = [0, 2, 3]
	return typeof persion0 != 'undefined'
		&& typeof persion1 != 'undefined'
		&& persion0 != persion1
		&& (tmp.indexOf(persion0) > -1 || tmp.indexOf(persion1) > -1)
}

/**
 * 检查两个人是否满足乘船返回条件，警察0或者母亲2或者父亲3单独回到右岸，或者带着左岸剩下人当中的一个人返回右岸
 */
function canBack(persion0, persion1) {
	var tmp = [0, 2, 3]
	return (typeof persion0 != 'undefined' || typeof persion1 != 'undefined')
		&& persion0 != persion1
		&& (tmp.indexOf(persion0) > -1 || tmp.indexOf(persion1) > -1)
}

/**
 * 过河或者返回之后检查两岸情况，如果被检查的一岸不满足其中一个条件，则返回 -1，否则返回 1，如果右岸的人全部移动到左岸，则返回 0，过河结束
 */
function check(right, left) {
	// 条件一 罪犯1和其他人(234567)在一起，但警察0不在
	if ((right[0] && !right[1]) || (!right[0] && right[1])) return -1
	if ((left[0] && !left[1]) || (!left[0] && left[1])) return -1
	// 条件二 父亲(3)和女儿(45)在一起，但母亲(2)不在
	if (right[3] && (right[4] || right[5]) && !right[2]) return -1
	if (left[3] && (left[4] || left[5]) && !left[2]) return -1
	// 条件三 母亲(2)和儿子(67)在一起，但父亲(3)不在
	if (right[2] && (right[6] || right[7]) && !right[3]) return -1
	if (left[2] && (left[6] || left[7]) && !left[3]) return -1
	// 检查是否过河完成
	var flag = true
	for (var i = 0; i < left.length; i++) {
		flag = flag && left[i]
	}
	// 如果过河完成返回0，否则返回1继续过河
	if (flag) return 0
	return 1
}

/**
 * 输出两岸情况
 */
function outPut(right, left, type) {
	console.log(type)
	console.log('right: ', right)
	console.log('left: ', left)
}

/**
 * 循环求解函数
 */
function main(right, left) {
	// 过河
	for (var i = 0; i < right.length; i++) {
		// 当这个人在右岸时，才能过河
		if (!right[i]) continue
		for (var j = 0; j < right.length; j++) {
			// 当这个人在右岸时，才能过河
			if (!right[j]) continue
			// 判断这两个人是否可以过河
			if (!canGo(i, j)) continue
			// 过河
			right[i] = 0
			right[j] = 0
			left[i] = 1
			left[j] = 1
			// 判断过河之后两岸情况
			var f0 = check(right, left)
			// 两岸不满足合理的相处条件
			if (f0 == -1) {
				right[i] = 1
				right[j] = 1
				left[i] = 0
				left[j] = 0
				continue
			}
			// 过河完成
			if (f0 == 0) {
				console.log('过河完成!!!!!!!!')
				return
			}
			// 输出两岸情况
			outPut(right, left, 'go')

			/**
			 * 返回右岸
			 */
			// 先尝试一人返回
			var k = 0
			for (k = 0; k < left.length; k++) {
				// 当这个人不在左岸，则不能算作将要返回的人
				if (!left[k]) continue
				// 判断是否满足返回条件
				if (canBack(k)) {
					left[k] = 0
					right[k] = 1
				}
				else {
					continue
				}
				// 判断过河之后两岸情况
				var f1 = check(right, left)
				if (f1 == 1) break
				else if (f1 == -1) {
					left[k] = 1
					right[k] = 0
				}
			}
			// 所有一人返回都不行后，尝试两人返回
			if (k == left.length) {
				for (var m = 0; m < left.length - 1; m++) {
					// 当这个人不在左岸，则不能算作将要返回的人
					if (!left[m]) continue
					for (var n = 0; n < left.length; n++) {
						// 当这个人不在左岸，则不能算作将要返回的人
						if (!left[n]) continue
						// 判断是否满足返回条件
						if (canBack(m, n)) {
							left[m] = 0
							left[n] = 0
							right[m] = 1
							right[n] = 1
						}
						else {
							continue
						}
						// 判断过河之后两岸情况
						var f2 = check(right, left)
						if (f2 == 1) break
						else if (f2 == -1) {
							left[m] = 1
							left[n] = 1
							right[m] = 0
							right[n] = 0
						}
					}
				}
			}
			// 输出两岸情况
			outPut(right, left, 'back')
			// 再次过河
			return main(right, left)
		}
	}
}

main(Right, Left)
