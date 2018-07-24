function UserData() {
	this.name = "name";
	this.title = 0;
	this.stageList = [];
	this.selectStage = 0;
}

UserData.prototype.setInit = function(name, title, stageList) {
	this.name = name;
	this.title = title;
	this.stageList = stageList;
}
UserData.prototype.setName = function(name) {
	this.name = name;
}

UserData.prototype.setTitle = function(title) {
	this.title = title;
};

UserData.prototype.setStageList = function(stageNo, val) {
	this.stageList[stageNo] = val;
};

var user = new UserData();
