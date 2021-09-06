// Learn TypeScript:
//  - https://docs.cocos.com/creator/manual/en/scripting/typescript.html
// Learn Attribute:
//  - https://docs.cocos.com/creator/manual/en/scripting/reference/attributes.html
// Learn life-cycle callbacks:
//  - https://docs.cocos.com/creator/manual/en/scripting/life-cycle-callbacks.html

const {ccclass, property} = cc._decorator;

@ccclass
export default class CustomButton extends cc.Component {

    @property({
        displayName: "APT值",
        type: cc.Node
    })
    atpNode: cc.Node = null

    @property({
        displayName: "价格",
        type: cc.Integer
    })
    worth: number = 100;

    // LIFE-CYCLE CALLBACKS:

    // onLoad () {}

    start () {

    }

    update (dt) {
        let atp = Number(this.atpNode.getComponent(cc.Label).string)
        this.getComponent(cc.Button).interactable = (atp >= this.worth);
    }
}
