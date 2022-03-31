class WalletModel {
	mergeCliWalletShowOutputData(cliWalletShowOutputData) {
		this.cliWalletShowOutputData = cliWalletShowOutputData;
	}
	get DisplayName() {
		return 'CAT WALLET';
	}
	get Tail() {
		return '123';
	}
}
module.exports.WalletModel = WalletModel;