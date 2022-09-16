
import { _decorator, Component, Node, Label, director } from 'cc';
const { ccclass, property } = _decorator;

/**
 * Predefined variables
 * Name = Game
 * DateTime = Thu Sep 15 2022 22:25:43 GMT+0800 (中国标准时间)
 * Author = mike0326
 * FileBasename = Game.ts
 * FileBasenameNoExtension = Game
 * URL = db://assets/scripts/Game.ts
 * ManualUrl = https://docs.cocos.com/creator/3.4/manual/zh/
 *
 */

@ccclass('Game')
export class Game extends Component {

	@property({ type: Node })
	private enemySkillNode: Node = null  // 绑定 enemy_skill 节点

	private enemyAttackType = 0 // 敌人招式：0：弓箭 1：流星锤 2：盾牌
	private timer = null

	start() {
		this.timer = setInterval(() => {
			this.randEnemyAttack()
		}, 100)
	}

	// 敌人随机招式
	randEnemyAttack() {
		this.enemyAttackType = Math.floor(Math.random() * 3) // 随机 0 - 2

		let children = this.enemySkillNode.children // 获取 enemy_skill 下的所有子节点

		children.forEach(childNode => {
			if (childNode.name === this.enemyAttackType.toString()) {
				childNode.active = true
			} else {
				childNode.active = false
			}
		})
	}

	@property({ type: Label })
	private hintLabel: Label = null // 绑定 hint 节点

	attack(event, customEventData) {
		if (!this.timer) {
			return
		}

		clearInterval(this.timer)
		this.timer = null

		let pkRes = 0  // 0：平， 1：赢， -1：输
		let attackType = parseInt(event.target.name) // 获取目标节点的 name

		if (attackType === 0) {
			if (this.enemyAttackType === 0) {
				pkRes = 0
			} else if (this.enemyAttackType === 1) {
				pkRes = 1
			} else if (this.enemyAttackType === 2) {
				pkRes = -1
			}
		} else if (attackType === 1) {
			if (this.enemyAttackType === 0) {
				pkRes = -1
			} else if (this.enemyAttackType === 1) {
				pkRes = 0
			} else if (this.enemyAttackType === 2) {
				pkRes = 1
			}
		} else if (attackType === 2) {
			if (this.enemyAttackType === 0) {
				pkRes = 1
			} else if (this.enemyAttackType === 1) {
				pkRes = -1
			} else if (this.enemyAttackType === 2) {
				pkRes = 0
			}
		}

		if (pkRes === -1) {
			this.hintLabel.string = '失败'
		} else if (pkRes === 1) {
			this.hintLabel.string = '胜利'
		} else {
			this.hintLabel.string = '平局'
		}
	}

	// 重新加载场景
	restart() {
		director.loadScene('Game')
	}
}


