! function () {
	"use strict";
	class t extends Laya.View {
		constructor() {
			super(), this.autoDestroyAtClosed = !0, this.name = this.constructor.name, this._event = {}, this._aniArr = [], this.$updateArr = []
		}
		onOpened(t) {
			super.onOpened(), this.argObj = t, this.initData(), this.initUI(), this.initEvent()
		}
		initUI() { }
		initData() { }
		initEvent() { }
		addEvent(t, e) {
			this._event[t] = e.bind(this), eventDispatcher.addEventListen(t, this, this._event[t])
		}
		removeEvent(t) {
			eventDispatcher.removeEventListen(t, this, this._event[t])
		}
		removeAllEvent() {
			for (var t in this._event) this.removeEvent(t)
		}
		dispatchEvent(t, e) {
			eventDispatcher.dispatchEvent(t, e)
		}
		playAni(t, e) {
			t._aniID && this._aniArr.push(t), t.play(0, e), t.$isPlaying = !0
		}
		stopAllAni() {
			for (var t = 0; t < this._aniArr.length; t++) {
				var e = this._aniArr[t];
				e.$isPlaying && e.stop()
			}
		}
		resumeAllAni() {
			for (var t = 0; t < this._aniArr.length; t++) {
				var e = this._aniArr[t];
				e.$isPlaying && e.play(0, e.loop)
			}
		}
		removeTimer() {
			if (this.$updateArr)
				for (var t = 0; t < this.$updateArr.length; t++) updateManager.clear(this.$updateArr[t])
		}
		doClose() {
			uiManager.closeUI(this.url, this.parent)
		}
		onClosed() {
			this.removeTimer(), this.stopAllAni(), this.removeAllEvent()
		}
	}
	class e {
		static copyForm(t, e) {
			for (let i in e) t[i] = e[i]
		}
		static copyForm2(t, e) {
			for (let i in e) "string" != typeof e[i] && "number" != typeof e[i] && "boolean" != typeof e[i] || (t[i] = e[i])
		}
		static isEqualDateTime(t, e) {
			if (!t || !e || 0 == t || 0 == e) return !1;
			let i = new Date(t),
				s = new Date(e);
			return i.getFullYear() == s.getFullYear() && i.getMonth() == s.getMonth() && i.getDate() == s.getDate()
		}
		static getAngleByTwoPoint(t, e) {
			let i = e.x - t.x,
				s = e.y - t.y;
			return 180 * Math.atan2(s, i) / Math.PI
		}
		static norTime(t) {
			let e = Math.floor(t / 3600),
				i = t % 60;
			return e + ":" + e % 60 + ":" + (i > 9 ? "" + i : "0" + i)
		}
		static norSecondTime(t) {
			let e = t % 60;
			return Math.floor(t / 60) + ":" + (e > 9 ? "" + e : "0" + e)
		}
		static get3D22Dpos(t, e) {
			let i = new Laya.Vector3;
			return e.viewport.project(t, e.projectionViewMatrix, i), i
		}
		static in3DPosInScene(t, e) {
			let i = this.get3D22Dpos(t, e);
			return i.x >= 0 && i.x <= Laya.stage.width && i.y >= 0 && i.y <= Laya.stage.height
		}
		static pointInRect(t, e, i) {
			let s = (i.b.x - i.a.x) * (e - i.a.y) - (i.b.y - i.a.y) * (t - i.a.x),
				a = (i.c.x - i.b.x) * (e - i.b.y) - (i.c.y - i.b.y) * (t - i.b.x),
				n = (i.d.x - i.c.x) * (e - i.c.y) - (i.d.y - i.c.y) * (t - i.c.x),
				o = (i.a.x - i.d.x) * (e - i.d.y) - (i.a.y - i.d.y) * (t - i.d.x);
			return s > 0 && a > 0 && n > 0 && o > 0 || s < 0 && a < 0 && n < 0 && o < 0
		}
		static getLineMethodParam(t, e, i, s) {
			let a = 0;
			return i != t && (a = (s - e) / (i - t)), {
				k: a,
				b: s - a * i
			}
		}
		static getPointDistLine(t, e, i, s) {
			return Math.abs(i * t - e + s) / Math.sqrt(i * i + 1)
		}
		static getTwoPointDist(t, e, i, s) {
			return Math.sqrt((i - t) * (i - t) + (s - e) * (s - e))
		}
		static isIn(t, e, i) {
			return t >= e && t <= i
		}
		static getBerizPoint(t, e, i, s) {
			return [Math.pow(1 - t, 2) * e.x + 2 * t * (1 - t) * i.x + Math.pow(t, 2) * s.x, Math.pow(1 - t, 2) * e.y + 2 * t * (1 - t) * i.y + Math.pow(t, 2) * s.y]
		}
		static getStrColorToRbg(t) {
			let e = [];
			for (let i = 1; i < t.length; i += 2) 255 == parseInt("0x" + t.slice(i, i + 2)) ? e.push(255) : e.push(parseInt("0x" + t.slice(i, i + 2)) / 255);
			return e
		}
		static flyImg(t, e, i = 6, s, a, n, o, r) {
			let l, h = e || Laya.stage;
			for (let e = 0; e < i; e++)(l = new Laya.Image(t)).x = s, l.y = a, h.addChild(l), Laya.Tween.to(l, {
				x: n,
				y: o
			}, 500, null, new Laya.Handler(this, function (t, s) {
				t.removeSelf(), t = null, e == i - 1 && r()
			}, [l, e]), 60 * e)
		}
		static imgComarse(t, e, i, s, a) {
			if (!e) return 0;
			let n = new Laya.Image;
			n.loadImage(t);
			n.drawToCanvas(i, s, 0, 0);
			Laya.Browser.onQGMiniGame;
			let o = n.drawToCanvas(i, s, 0, 0);
			Laya.SubmitCanvas;
			let r = e.drawToCanvas(i, s, 0, 0);
			a(this.pixelsContrast(o.getTexture().getPixels(0, 0, 500, 375), r.getTexture().getPixels(0, 0, i, s), i, s))
		}
		static pixelsContrast(t, e, i, s) {
			var a = i || 8,
				n = s || 8;
			t = this.pixelsToBinary(t, 1), e = this.pixelsToBinary(e, 1);
			var o = 0,
				r = 0,
				l = 0;
			let h = a * n / 2;
			for (var d = 0; d < h; d++) 1 != t[d] && 0 != t[d] && console.log(t[d]), 0 == t[d] && 0 == e[d] || (0 == t[d] && 1 == e[d] ? l++ : 1 == t[d] && (r++, 1 == e[d] && o++));
			var c = (o - l) / r * 100;
			return c < 0 && (c = 0), (c = Math.floor(c)) > 97 && (c = 100), c
		}
		static pixelsToBinary(t, e) {
			var i = 0,
				s = t.length,
				a = 0,
				n = new Uint8Array(s / 8);
			if (!e) {
				for (var o = 0; o < s; o += 8) i += .299 * t[o] + .587 * t[o + 1] + .114 * t[o + 2];
				e = i /= s / 4
			}
			let r = 0;
			for (o = 0; o < s; o += 8) .299 * t[o] + .587 * t[o + 1] + .114 * t[o + 2] >= e ? (n[a++] = 1, r++) : n[a++] = 0;
			return console.log("tcount:" + r), n
		}
		static getSpPixels(t, e, i) {
			let s = new Laya.Image;
			return s.loadImage(t), s.drawToCanvas(tmplw, tmplh, 0, 0).getTexture().getPixels(0, 0, e, i)
		}
		static createColorFilter(t = 0, e = 0, i = 0) {
			let s = [t, 0, 0, 0, 0, 0, e, 0, 0, 0, 0, 0, i, 0, 0, 0, 0, 0, 1, 0];
			return [new Laya.ColorFilter(s)]
		}
		static twMoveList(t) {
			let e = t;
			e.scrollTo(0), e.tweenTo(9, 2e4)
		}
		static stopMove(t) {
			let e = t;
			Laya.Tween.clearTween(e)
		}
		static random(t, e) {
			return Math.floor(Math.random() * (e + 1 - t) + t)
		}
		static arrayRandom(t) {
			return t[this.random(0, t.length - 1)]
		}
		static shiftRandom(t) {
			var e = this.random(0, t.length - 1),
				i = t[e];
			return t.removeAt(e), i
		}
		static randomIndexByWeight(t, e) {
			if (!e) {
				e = 0;
				for (var i = 0; i < t.length; i++) e += t[i]
			}
			for (var s = this.random(0, e + 1), a = 0; a < t.length; a++)
				if ((s -= t[a]) <= 0) return a;
			return 0
		}
		static CreateBezierPoints(t, e) {
			for (var i = [], s = 0; s < e; s++) {
				var a = this.MultiPointBezier(t, s / e);
				i.push(a)
			}
			return i
		}
		static MultiPointBezier(t, i) {
			let s = t.length,
				a = 0,
				n = 0;
			for (let o = 0; o < s; o++) {
				let r = t[o];
				a += r.x * Math.pow(1 - i, s - 1 - o) * Math.pow(i, o) * e.erxiangshi(s - 1, o), n += r.y * Math.pow(1 - i, s - 1 - o) * Math.pow(i, o) * e.erxiangshi(s - 1, o)
			}
			return {
				x: a,
				y: n
			}
		}
		static erxiangshi(t, e) {
			let i = 1,
				s = 1;
			for (; e > 0;) i *= t, s *= e, t--, e--;
			return i / s
		}
	}
	window.tools = e, Laya.Sprite.drawToCanvas = function (t, e, i, s, a, n) {
		a -= t.x, n -= t.y, a |= 0, n |= 0, i |= 0, s |= 0;
		var o = new Context;
		o.size(i, s), o.asBitmap = !0, o._targets.start(), o._targets.clear(0, 0, 0, 0), RenderSprite.renders[e]._fun(t, o, a, n), o.flush(), o._targets.end(), o._targets.restore();
		var r = o._targets.getData(0, 0, i, s);
		o.destroy();
		var l = new HTMLCanvas(!0);
		l.size(i, s);
		for (var h = l.getContext("2d").getImageData(0, 0, i, s), d = 4 * i, c = h.data, u = s - 1, p = u * d, g = 0; u >= 0; u--) c.set(r.subarray(g, g + d), p), p -= d, g += d;
		var m = new HTMLCanvas(!0);
		return m.size(i, s), m.getContext("2d").putImageData(h, 0, 0), m
	};
	class i {
		constructor() {
			this.level = 1, this.name = "", this.id = 0, this.gold = 3e3, this.diamand = 0, this.firstLoginDate = (new Date).getTime(), this.isSound = !0, this.isVibrate = !0
		}
		addAtt(t, e, i = !1) {
			i ? this[t] = e : this[t] ? this[t] += e : this[t] = e
		}
		addGold(t) {
			this.gold += t, console.log("当前金币", this.gold), this.save()
		}
		levelup(t = 1) {
			if (this.level >= G.MAXLV) {
				this.tongGuan = !0;
				var e = [1, 6, 11, 16, 21, 26];
				this.level = e[utils.random(0, e.length - 1)]
			} else this.level += t;
			return this.save(), this.level
		}
		setSound(t) {
			this.isSound = t, this.save()
		}
		setVibrate(t) {
			this.isVibrate = t, this.save()
		}
		copyFrom(t) {
			e.copyForm(this, t)
		}
		save() {
			let t = {};
			e.copyForm(t, this), dataManager.setStorage(t)
		}
	}
	class s extends i {
		constructor() {
			super(), this.inGameTime = (new Date).getTime(), this.gates = "", this.tryoutID = 0, this.curSkin = 1, this.curGoldSkin = 0, this.ownSkin = "1", this.goldSkin = "", this.timeSkillLv = 1, this.initPersonSkillLv = 1, this.digNum = 10, this.materialMap = "", this.DinosaurType = "", this.ownDino = [], this.ownDinoIndex = 0, this.zooArr = JSON.stringify(new Map), this.zooLv = 0, this.dinosaurNum = 3, this.tongGuan = !1, this.lastOnlineTime = 0, this.totalIncome = 0, this.enterTime = 0, this.guideStep = 0, this.TL = 1, this.COIN = 0, this.LOOK = 0, this.WUXIAN = !1
		}
		setGatePorss(t, e) {
			if (this.gates) {
				let i, s, a, n = "",
					o = this.gates.split("|");
				for (let r = 0; r < o.length; r++) i = o[r].split("_"), parseInt(i[0]) == t && e > parseInt(i[1]) ? (s = t + "_" + e, a = !0) : s = i[0] + "_" + i[1], s && (n ? n += "|" + s : n = s);
				a ? this.gates = n : this.gates += "|" + t + "_" + e
			} else this.gates = t + "_" + e;
			this.save()
		}
		getGatePross(t) {
			if (this.gates) {
				let e = this.gates.split("|");
				for (let i = 0; i < e.length; i++)
					if (e[i].split("_")[0] == t + "") return parseInt(e[i].split("_")[1])
			}
			return 0
		}
		isUnlock(t) {
			let e = this.gates.split("|");
			for (let i = 0; i < e.length; i++)
				if (parseInt(e[i].split("_")[0]) == t) return !0;
			return !1
		}
		copyFrom(t) {
			super.copyFrom(t);
			let e = new Date,
				i = e.getFullYear() + "_" + e.getMonth() + "_" + e.getDate();
			i != this.day && (this.nativeAdClickTimes = 0, this.day = i, this.save())
		}
		static getIns() {
			return this._ins || (this._ins = new s), this._ins
		}
		setTryoutID(t) {
			this.tryoutID = t, this.save()
		}
		setCurSkin(t) {
			this.curSkin = t, this.save()
		}
		addOwnSkin(t) {
			if (0 == this.ownSkin.length) var e = [];
			else e = this.ownSkin.split(",");
			for (var i = 0; i < e.length; i++)
				if (e[i] == t) return;
			e.push(t), this.ownSkin = e.join(","), this.save()
		}
		setCurGoldSkin(t) {
			this.curGoldSkin = t, this.save()
		}
		addGoldSkin(t) {
			if (0 == this.goldSkin.length) var e = [];
			else e = this.goldSkin.split(",");
			for (var i = 0; i < e.length; i++)
				if (e[i] == t) return;
			e.push(t), this.goldSkin = e.join(","), this.save()
		}
		upTimeSkill() {
			this.timeSkillLv++, this.save()
		}
		upInitSkill() {
			this.initPersonSkillLv++, this.save()
		}
		minusDigNum() {
			this.digNum--, this.save()
		}
		addDigNum(t) {
			this.digNum += t, this.save()
		}
		initDigNum() {
			this.digNum = G.MAXTL, this.save()
		}
		addMaterial(t, e) {
			var i = JSON.parse(this.materialMap);
			i[t].num += e, this.materialMap = JSON.stringify(i), this.save()
		}
		minusMaterial(t, e) {
			var i = this.materialMap;
			i && ((i = JSON.parse(this.materialMap))[t].num -= e, this.materialMap = JSON.stringify(i), this.save())
		}
		initMaterial() {
			var t = {};
			this.materialMap || (t.lvYe = {
				name: "lvYe",
				lv: 1,
				num: 1
			}, t.lanYe = {
				name: "lanYe",
				lv: 1,
				num: 0
			}, t.ziYe = {
				name: "ziYe",
				lv: 1,
				num: 0
			}, t.suiGu = {
				name: "suiGu",
				lv: 1,
				num: 1
			}, t.tuiGu = {
				name: "tuiGu",
				lv: 1,
				num: 0
			}, t.touGu = {
				name: "touGu",
				lv: 1,
				num: 0
			}, this.materialMap = JSON.stringify(t), this.save())
		}
		addDinosaurType(t, e, i) {
			var s = this.DinosaurType;
			s ? s = JSON.parse(this.DinosaurType) : ((s = {}).da = {}, s.zhong = {}, s.xiao = {}), s[t][i] ? s[t][i] += e : s[t][i] = e, this.DinosaurType = JSON.stringify(s), this.ownDino.push({
				index: this.ownDinoIndex++,
				id: i,
				isShow: !1,
				seat: -1
			}), this.save()
		}
		setShowDino(t, e) {
			for (var i = 0; i < this.ownDino.length; i++) this.ownDino[i].seat == e && (this.ownDino[i].isShow = !1, this.ownDino[i].seat = -1);
			for (i = 0; i < this.ownDino.length; i++) this.ownDino[i].index == t && (this.ownDino[i].isShow = !0, this.ownDino[i].seat = e);
			this.save()
		}
		setUnShowDino(t) {
			for (var e = 0; e < this.ownDino.length; e++) this.ownDino[e].index == t && (this.ownDino[e].isShow = !1, this.ownDino[e].seat = -1);
			this.save()
		}
		delDinosaurType(t) {
			for (var e = 0; e < this.ownDino.length; e++)
				if (this.ownDino[e].index == t) {
					this.ownDino.removeAt(e);
					break
				} this.save()
		}
		addZoo() {
			this.zooLv++, this.save()
		}
		addDinosaurNum() {
			this.dinosaurNum++, this.save()
		}
		addIncome() {
			this.zooLv > 0 && (this.totalIncome += dataManager.getZooRevenue(), this.totalIncome = Math.ceil(this.totalIncome), this.totalIncome > D.dinosaurIsland[this.zooLv].limit && (this.totalIncome = D.dinosaurIsland[this.zooLv].limit)), this.save()
		}
		getIncome() {
			this.gold += this.totalIncome, this.totalIncome = 0, this.save()
		}
		updateOnlineTime() {
			this.lastOnlineTime = G.NOW, this.save()
		}
		setEnterTime() {
			this.enterTime = G.NOW, this.save()
		}
		addGuideStep() {
			this.guideStep++, this.save()
		}
		setLook(t) {
			this.LOOK = t, this.save()
		}
		setWuXian(t) {
			this.WUXIAN = t, this.save()
		}
		setTl(t) {
			this.TL = t, this.save()
		}
		setCoin(t) {
			this.COIN = t, this.save()
		}
		setInGameTime(t) {
			this.inGameTime = t, this.save()
		}
	}
	window.playerData = s;
	class a extends t {
		constructor() {
			super()
		}
		initData() {
			this.tlArr = [], this.openNum = 0;
			let t = [0, 1, 2, 3, 4, 5, 6, 7, 8];
			this.getIndex = [];
			this.coinArr = [];
			for (let t = 0; t < 9; t++) this.rewardIndex == t && this.getRewardID ? this.coinArr.push(0) : this.coinArr.push(utils.random(3, 10));
			for (let e = 0; e < t.length; e++) t[e] == this.rewardIndex && t.splice(e, 1);
			for (this.freeIndexs = []; this.freeIndexs.length < 3;) {
				let e = utils.random(0, t.length - 1);
				this.freeIndexs.push(t[e]), t.splice(e, 1)
			}
			this.showAll = !1, console.log("随机序号", t), console.log("免费序号", this.freeIndexs), console.log("免费部件序号", this.rewardIndex)
		}
		initUI() {
			this.list.array = this.coinArr, this.btn_clsoe.visible = !1
		}
		initEvent() {
			utils.onBtnScaleEvent(this.btn_clsoe, this, () => {
				this.showAll = !0, this.list.refresh(), Laya.timer.once(1500, this, () => {
					this.doClose()
				})
			}), utils.listHandler(this.list, this, (t, e) => {
				let i = t.dataSource,
					a = utils.getChildDeep(t, "box_ad"),
					n = utils.getChildDeep(a, "icon"),
					o = utils.getChildDeep(a, "video"),
					r = utils.getChildDeep(t, "box_buJian"),
					l = utils.getChildDeep(r, "icon"),
					h = utils.getChildDeep(t, "box_coin"),
					d = utils.getChildDeep(t, "num");
				r.visible = !1, h.visible = !1, d.visible = !1;
				for (let t = 0; t < this.freeIndexs.length; t++) this.freeIndexs[t] == e && (o.visible = !1);
				0 == i ? (l.skin = D.AnimalParts[this.getRewardID].icon2, d.text = "x1") : d.text = "x" + i, this.showAll && (a.visible = !1, 0 == i ? r.visible = !0 : h.visible = !0, d.visible = !0), t.offAll(), utils.onBtnScaleEvent(t, this, () => {
					for (let t = 0; t < this.getIndex.length; t++)
						if (this.getIndex[t] == e) return;
					let t = () => {
						this.getIndex.push(e), 0 == i || s.getIns().addGold(i), n.skin = "sdk/img_openBox.png";
						let t = new Laya.TimeLine;
						if (this.tlArr.push(t), t.to(a, {}, 300).to(a, {
							scaleX: 0,
							scaleY: 0
						}, 300).play(0, !1), t.on(Laya.Event.COMPLETE, this, () => {
							t.pause(), t.destroy()
						}), 0 == i) {
							r.scaleX = .2, r.scaleY = .2, r.visible = !0;
							let t = new Laya.TimeLine;
							this.tlArr.push(t), t.to(r, {}, 100).to(r, {
								scaleX: .8,
								scaleY: .8
							}, 300).play(0, !1), t.on(Laya.Event.COMPLETE, this, () => {
								t.pause(), t.destroy(), d.visible = !0
							})
						} else {
							h.scaleX = .2, h.scaleY = .2, h.visible = !0;
							let t = new Laya.TimeLine;
							this.tlArr.push(t), t.to(h, {}, 100).to(h, {
								scaleX: 1,
								scaleY: 1
							}, 300).play(0, !1), t.on(Laya.Event.COMPLETE, this, () => {
								t.pause(), t.destroy(), d.visible = !0
							})
						}
					};
					o.visible ? window.uleeSDK ? (audioManager.setMusicMuted(!1), uleeSDK.showVideoAD(() => {
						t(), audioManager.huifuMusicMuted()
					}, () => {
						audioManager.huifuMusicMuted()
					})) : t() : (this.minusKey(), t())
				})
			}, t => { })
		}
		minusKey() {
			this.openNum++;
			let t = t => {
				let e = new Laya.TimeLine;
				this.tlArr.push(e), e.to(t, {
					scaleX: 0,
					scaleY: 0
				}, 300).play(0, !1), e.on(Laya.Event.COMPLETE, this, () => {
					e.pause(), e.destroy(), this.openNum >= 3 && (this.btn_clsoe.visible = !0)
				})
			};
			1 == this.openNum ? t(utils.getChildDeep(this.box_keys, "key1")._children[0]) : 2 == this.openNum ? t(utils.getChildDeep(this.box_keys, "key2")._children[0]) : 3 == this.openNum && t(utils.getChildDeep(this.box_keys, "key3")._children[0])
		}
		doClose() {
			this.argObj && this.argObj.callback && this.argObj.callback();
			for (let t = 0; t < this.tlArr.length; t++) this.tlArr[t]._tweenDic && (this.tlArr[t].pause(), this.tlArr[t].destroy());
			super.doClose()
		}
	}
	class n extends t {
		constructor() {
			super()
		}
		initData() { }
		initUI() {
			this.updateCoin(), audioManager.stopMusic(), this.ani1.play(0, !1), window.uleeSDK && (uleeSDK.showInterstitialAD(), "wx" == uleeSDK.pf ? uleeSDK.showInterstitialAD() : "tt" == uleeSDK.pf && uleeSDK.showInterstitialAD(() => { }))
		}
		initEvent() {
			var t = this;
			utils.onBtnScaleEvent(this.btn_skip, this, function () {
				this.btn_skip.click || this.btn_reset.click || (this.btn_skip.click = !0, uleeSDK ? (audioManager.setMusicMuted(!1), uleeSDK.showVideoAD(function () {
					s.getIns().levelup(), t.doClose(), audioManager.huifuMusicMuted()
				}, function () {
					t.btn_skip.click = !1, audioManager.huifuMusicMuted()
				})) : (s.getIns().levelup(), this.doClose()))
			}), utils.onBtnScaleEvent(this.btn_reset, this, function () {
				this.btn_skip.click || this.btn_reset.click || (this.btn_reset.click = !0, this.doClose())
			})
		}
		updateCoin() {
			utils.getChildDeep(this.box_coin, "label_num").text = s.getIns().gold
		}
		doClose() {
			super.doClose(), G.PULLOUT_TRYOUTUI = !0, s.getIns().setTryoutID(0), G.BattleScript.clearModel(), G.BattleScript.initGame(), G.MainUI.updateUI(), audioManager.playMusic(1)
		}
	}
	class o extends t {
		constructor() {
			super()
		}
		initData() { }
		initUI() {
			this.label_title.text = this.argObj.title, this.label_content.text = this.argObj.content, this.argObj.isTip && (this.img_tip.visible = !0)
		}
		initEvent() {
			utils.onBtnScaleEvent(this.btn_close, this, this.doClose), utils.onBtnScaleEvent(this.btn_cancel, this, function () {
				this.argObj.fail && this.argObj.fail(), this.doClose()
			}), utils.onBtnScaleEvent(this.btn_get, this, function () {
				this.argObj.success && this.argObj.success(), this.doClose()
			})
		}
		doClose() {
			super.doClose()
		}
	}
	class r extends Laya.Templet {
		constructor(t, e) {
			super(), this.callback = e, this.on(Laya.Event.COMPLETE, this, this.init), this.loadAni(t), this.initData()
		}
		initData() {
			this.bkSlotSkin = {}, this.customSkin = {}
		}
		init() {
			this.mArmature = this.buildArmature(1), this.mArmature.play(0, !0), this.callback && this.callback(this.mArmature)
		}
		play(t) {
			this.mArmature.play(t, !0)
		}
		getIndexByName(t, e) {
			let i = this.mArmature.getSlotByName(t).currSlotData.displayArr;
			for (let t = 0; t < i.length; t++)
				if (i[t].name == e) return t
		}
		changeDBSkinByIndex(t, e) {
			let i = this.mArmature._boneSlotDic;
			for (let s in i)
				if (t == s) {
					let t = i[s].srcDisplayIndex;
					this.mArmature.replaceSlotSkinByIndex(s, t, e)
				}
		}
		changeDBSkinByName(t, e) {
			let i = this.mArmature._boneSlotDic,
				s = this.getIndexByName(t, e);
			for (let e in i)
				if (t == e) {
					let t = i[e].srcDisplayIndex;
					this.mArmature.replaceSlotSkinByIndex(e, t, s)
				}
		}
		setSlotSkin(t, e) {
			if (!this.bkSlotSkin[t]) {
				this.bkSlotSkin[t] = {};
				let e = this.mArmature.getSlotByName(t).currSlotData.displayArr;
				for (let i = 0; i < e.length; i++) this.bkSlotSkin[t][e[i].name] = this.getTexture(e[i].name)
			}
			if (!this.customSkin[t]) {
				var i = new Laya.Texture;
				this.customSkin[t] = i
			}
			this.mArmature.setSlotSkin(t, this.customSkin[t]), this.customSkin[t].load(e)
		}
		hideSlot(t) {
			this.setSlotSkin(t, "res/texture/null.png")
		}
		showSlot(t) {
			if (this.bkSlotSkin[t]) {
				let e = this.mArmature.getSlotByName(t).currSlotData.displayArr;
				this.changeSlotSkin(t, this.bkSlotSkin[t][e[0].name])
			}
		}
		changeSlotSkin(t, e) {
			this.bkSlotSkin[t] && this.mArmature.setSlotSkin(t, this.bkSlotSkin[t][e]);
			let i = this.getIndexByName(t, e);
			this.mArmature.replaceSlotSkinByIndex(t, 0, i)
		}
		destroy() {
			super.destroy()
		}
	}
	class l extends Laya.AnimatorStateScript {
		constructor() {
			super(), this._onAniComplete = null, this._onAniStart = null
		}
		onStateEnter() {
			this._onAniStart && this._onAniStart()
		}
		onStateUpdate() { }
		onStateExit() {
			this._onAniComplete && this._onAniComplete(), this.loop && this.animator && this.animator.curAnim == this.animName && this.animator.play(this.animName, 0, 0)
		}
		setComplete(t) {
			this._onAniComplete = t
		}
		setStart(t) {
			this._onAniStart = t
		}
	}
	class h extends Laya.Material {
		constructor() {
			super(), h.initShader(), this.setShaderName("OutLine"), this._shaderValues.addDefine(h.DEFINE_LIGHTING), this.albedoColor = new Laya.Vector4(1, 1, 1, 1), this.lineWidth = 3e-4, this.lineColor = new Laya.Vector4(0, 0, 0, 1), this.cull = Laya.RenderState.CULL_FRONT
		}
		set openOutLine(t) {
			t ? this._shaderValues.addDefine(h.DEFINE_OUTLINESWITCH) : this._shaderValues.removeDefine(h.DEFINE_OUTLINESWITCH)
		}
		set openCartoon(t) {
			t ? this._shaderValues.removeDefine(h.DEFINE_LIGHTING) : this._shaderValues.addDefine(h.DEFINE_LIGHTING)
		}
		set cull(t) {
			this._shaderValues.setInt(h.CULL, t)
		}
		set lineColor(t) {
			this._shaderValues.setVector(h.LINECOLOR, t)
		}
		set lineWidth(t) {
			this._shaderValues.setNumber(h.LINEWIDTH, t)
		}
		set albedoTexture(t) {
			t ? this._shaderValues.addDefine(h.SHADERDEFINE_ALBEDOTEXTURE) : this._shaderValues.removeDefine(h.SHADERDEFINE_ALBEDOTEXTURE), this._shaderValues.setTexture(h.ALBEDOTEXTURE, t)
		}
		set albedoColor(t) {
			this._shaderValues.setVector(h.ALBEDOCOLOR, t)
		}
		static initShader() {
			var t = {
				a_Position: Laya.VertexMesh.MESH_POSITION0,
				a_TexCoord0: Laya.VertexMesh.MESH_TEXTURECOORDINATE0,
				a_Normal: Laya.VertexMesh.MESH_NORMAL0,
				a_BoneIndices: Laya.VertexMesh.MESH_BLENDINDICES0,
				a_BoneWeights: Laya.VertexMesh.MESH_BLENDWEIGHT0,
				a_MvpMatrix: Laya.VertexMesh.MESH_MVPMATRIX_ROW0
			},
				e = {
					u_MvpMatrix: Laya.Shader3D.PERIOD_SPRITE,
					u_Bones: Laya.Shader3D.PERIOD_CUSTOM,
					u_AlbedoColor: Laya.Shader3D.PERIOD_MATERIAL,
					u_AlbedoTexture: Laya.Shader3D.PERIOD_MATERIAL,
					u_LineWidth: Laya.Shader3D.PERIOD_MATERIAL,
					u_LineColor: Laya.Shader3D.PERIOD_MATERIAL,
					u_AmbientColor: Laya.Shader3D.PERIOD_SCENE,
					u_LightBuffer: Laya.Shader3D.PERIOD_SCENE,
					u_WorldMat: Laya.Shader3D.PERIOD_SPRITE,
					u_DirationLightCount: Laya.Shader3D.PERIOD_SCENE
				},
				i = {
					s_Cull: Laya.Shader3D.RENDER_STATE_CULL
				},
				s = Laya.Shader3D.add("OutLine"),
				a = new Laya.SubShader(t, e);
			s.addSubShader(a);
			a.addShaderPass('\n            #include "Lighting.glsl";\n            #ifdef GPU_INSTANCE\n                attribute mat4 a_MvpMatrix;\n            #else\n               uniform mat4 u_MvpMatrix;\n            #endif\n            \n            attribute vec3 a_Normal; \n            attribute vec4 a_Position;\n            attribute vec2 a_TexCoord0;\n            \n            varying vec2 v_TexCoord0;\n            varying vec3 v_Normal; \n            \n            uniform mat4 u_WorldMat;\n            \n            #ifdef BONE\n                attribute vec4 a_BoneIndices;\n                attribute vec4 a_BoneWeights;\n                uniform mat4 u_Bones[24];\n            #endif\n\n            void main(){\n                vec4 position = a_Position;\n               \n                #ifdef BONE\n                    mat4 boneMat;\n                    \n                    boneMat = u_Bones[int(a_BoneIndices.x)] * a_BoneWeights.x;\n                    boneMat += u_Bones[int(a_BoneIndices.y)] * a_BoneWeights.y;\n                    boneMat += u_Bones[int(a_BoneIndices.z)] * a_BoneWeights.z;\n                    boneMat += u_Bones[int(a_BoneIndices.w)] * a_BoneWeights.w;\n                    \n                    position = boneMat * a_Position;\n                #endif\n                v_TexCoord0 = a_TexCoord0;\n                #ifdef GPU_INSTANCE\n                    gl_Position = a_MvpMatrix * position;\n                #else\n                    gl_Position = u_MvpMatrix * position;\n                #endif\n                \n                mat3 worldMat = INVERSE_MAT(mat3(u_WorldMat)); \n                v_Normal = normalize(worldMat * a_Normal);\n           \n                gl_Position = remapGLPositionZ(gl_Position);\n            }', '\n            #ifdef GL_FRAGMENT_PRECISION_HIGH\n                precision highp float;\n                precision highp int;\n            #else\n                precision mediump float;\n                precision mediump int;\n            #endif\n            \n            #include "Lighting.glsl"\n        \n            #ifdef LIGHTING\n            #endif\n            \n            uniform vec3 u_AmbientColor;//环境光\n            uniform int u_DirationLightCount;//平行光数量\n            uniform sampler2D u_LightBuffer;\n        \n            uniform vec4 u_AlbedoColor;\n            \n            #ifdef ALBEDOTEXTURE\n                uniform sampler2D u_AlbedoTexture;\n            #endif\n            \n            varying vec2 v_TexCoord0;\n            varying vec3 v_Normal;\n            \n            void main(){\n                vec4 color = u_AlbedoColor;\n            \n                #ifdef ALBEDOTEXTURE\n                    color *= texture2D(u_AlbedoTexture , v_TexCoord0);\n                #endif\n                \n                #ifdef LIGHTING\n                   vec3 diffuse = vec3(0.0);\n                   for(int i=0;i<20;i++){\n                        if(i>=u_DirationLightCount)\n                            break;\n                            \n                        DirectionLight directionLight = getDirectionLight(u_LightBuffer, i);\n                        \n                        float ln = dot(v_Normal, directionLight.direction * -1.0);\n                        ln = max(ln, 0.0);\n                        // ln = ln * 0.5 + 0.5;\n                        \n                        diffuse += directionLight.color * ln;\n                   }\n                   color = vec4(color.rgb * (u_AmbientColor.rgb + diffuse), color.a);\n               #endif\n            \n                gl_FragColor = color;\n            }');
			a.addShaderPass("\n        #include 'Lighting.glsl';\n        #ifdef GPU_INSTANCE\n            attribute mat4 a_MvpMatrix;\n        #else\n            uniform mat4 u_MvpMatrix;\n        #endif\n        \n        attribute vec4 a_Position;\n        \n        attribute vec3 a_Normal;\n        \n        #ifdef OUTLINESWITCH\n        #endif\n        \n        uniform float u_LineWidth;\n        #ifdef BONE\n            attribute vec4 a_BoneIndices;\n            attribute vec4 a_BoneWeights;\n            uniform mat4 u_Bones[24];\n        #endif\n        \n        void main()\n        {\n            #ifdef OUTLINESWITCH\n                vec4 position = vec4(a_Position.xyz + a_Normal * u_LineWidth , a_Position.w);\n\n                #ifdef BONE\n                        mat4 boneMat;\n\n                        boneMat = u_Bones[int(a_BoneIndices.x)] * a_BoneWeights.x;\n                        boneMat += u_Bones[int(a_BoneIndices.y)] * a_BoneWeights.y;\n                        boneMat += u_Bones[int(a_BoneIndices.z)] * a_BoneWeights.z;\n                        boneMat += u_Bones[int(a_BoneIndices.w)] * a_BoneWeights.w;\n\n                        position = boneMat * position;\n                #endif\n\n                #ifdef GPU_INSTANCE\n                    gl_Position = a_MvpMatrix * position;\n                #else\n                    gl_Position = u_MvpMatrix * position;\n                #endif\n\n                gl_Position = remapGLPositionZ(gl_Position);\n            #endif\n        }", "\n        \n            #ifdef GL_FRAGMENT_PRECISION_HIGH\n                precision highp float;\n            #else\n                precision mediump float;\n            #endif\n            \n            uniform vec4 u_LineColor;\n            \n            void main()\n            {\n                #ifdef OUTLINESWITCH\n                    gl_FragColor = u_LineColor;\n                #endif\n            }", i)
		}
	}
	h.ALBEDOCOLOR = Laya.Shader3D.propertyNameToID("u_AlbedoColor"), h.ALBEDOTEXTURE = Laya.Shader3D.propertyNameToID("u_AlbedoTexture"), h.LINEWIDTH = Laya.Shader3D.propertyNameToID("u_LineWidth"), h.LINECOLOR = Laya.Shader3D.propertyNameToID("u_LineColor"), h.CULL = Laya.Shader3D.propertyNameToID("s_Cull"), h.DEFINE_OUTLINESWITCH = Laya.Shader3D.getDefineByName("OUTLINESWITCH"), h.SHADERDEFINE_ALBEDOTEXTURE = Laya.Shader3D.getDefineByName("ALBEDOTEXTURE"), h.DEFINE_LIGHTING = Laya.Shader3D.getDefineByName("LIGHTING");
	class d {
		constructor() {
			this.filePath = "res/", this.initModelId = [10001], this.scale = {}, this.pos = {}, this.models = {}, this.customMat = {}
		}
		getModelUrlByName(t) {
			return this.filePath + t + ".lh"
		}
		getInitModelNames() {
			let t = [],
				e = this.initModelId;
			for (let i = 0; i < e.length; i++) {
				let s = D.PrefabsPath[e[i]].chs;
				this.scale[s] = D.PrefabsPath[e[i]].scale, this.pos[s] = D.PrefabsPath[e[i]].pos, t.push(s)
			}
			return t
		}
		getInitModelUrls() {
			let t = [],
				e = this.initModelId;
			for (let i = 0; i < e.length; i++) {
				let s = D.PrefabsPath[e[i]].chs;
				this.scale[s] = D.PrefabsPath[e[i]].scale, this.pos[s] = D.PrefabsPath[e[i]].pos, t.push(this.getModelUrlByName(s))
			}
			return t
		}
		initModels(t = null) {
			let e = this.getInitModelUrls();
			Laya.loader.create(e, new Laya.Handler(this, function () {
				let i = this.getInitModelNames();
				for (let t = 0; t < i.length; t++) this.models[i[t]] = Laya.loader.getRes(e[t].url);
				t && t()
			}))
		}
		loadModel(t, e) {
			let i = this.getModelUrlByName(t);
			if (i.indexOf("dinoModel") > -1 && Laya.Browser.onMiniGame) {
				let t = i.split("/");
				i = wx.env.USER_DATA_PATH;
				for (let e = 2; e < t.length; e++) i += "/" + t[e]
			}
			Laya.loader.create([i], new Laya.Handler(this, function () {
				this.models[t] = Laya.loader.getRes(i);
				let s = this.models[t].clone();
				this.setLocalScale(s, this.scale[t]), this.pos[t].length > 1 && this.setLocalPosition(s, parseFloat(this.pos[t][0]), parseFloat(this.pos[t][1]), parseFloat(this.pos[t][2])), e && e(s)
			}))
		}
		getModelByName(t, e) {
			let i = this.models[t];
			if (!i) return this.loadModel(t, e); {
				let s = i.clone();
				this.setLocalScale(s, this.scale[t]), this.pos[t].length > 1 && this.setLocalPosition(s, parseFloat(this.pos[t][0]), parseFloat(this.pos[t][1]), parseFloat(this.pos[t][2])), e(s)
			}
		}
		getModelById(t, e) {
			let i = D.PrefabsPath[t].chs;
			return this.scale[i] = D.PrefabsPath[t].scale, this.pos[i] = D.PrefabsPath[t].pos, this.getModelByName(i, e)
		}
		getPosition(t) {
			return t.transform._localPosition
		}
		setLocalPosition(t, e, i, s) {
			let a = t.transform._localPosition;
			a.x = e, a.y = i, a.z = s, t.transform.localPosition = t.transform._localPosition
		}
		setLocalScale(t, e, i, s) {
			void 0 === e && (e = 1), void 0 === i && (i = e), void 0 === s && (s = e);
			let a = t.transform._localScale;
			a.x = e, a.y = i, a.z = s, t.transform.localScale = t.transform._localScale
		}
		setLocalRotation(t, e, i, s) {
			if (!t) return;
			t.angleV3 || (t.angleV3 = new Laya.Vector3, t.radV3 = new Laya.Vector3), t.angleV3.x = i, t.angleV3.y = e, t.angleV3.z = s;
			let a = t.radV3;
			a.x = i * Math.RAD_1_ANGLE, a.y = e * Math.RAD_1_ANGLE, a.z = s * Math.RAD_1_ANGLE;
			var n = t.transform;
			Laya.Quaternion.createFromYawPitchRoll(a.x, a.y, a.z, n._localRotation), n.localRotation = n._localRotation
		}
		setAlpha(t, e) {
			t && t._alpha != e && (this.setAlalbedo(t, e), this._alpha = e)
		}
		setAlalbedo(t, e, i, s, a) {
			if (t) {
				var n = t.meshRenderer || t.skinnedMeshRenderer;
				if (n)
					for (var o = n.materials, r = o.length - 1; r >= 0; r--) {
						var l = o[r];
						0 == l.cull && 1 == l.blend && 770 == l.srcBlend && 1 == l.dstBlend || (e < 1 && (l.renderMode = Laya[l.constructor.name].RENDERMODE_TRANSPARENT), void 0 === i && (i = l.albedoColorR), void 0 === s && (s = l.albedoColorG), void 0 === a && (a = l.albedoColorB), l.albedoColorA = e, l.albedoColorR = i, l.albedoColorG = s, l.albedoColorB = a)
					} else
					for (var h = 0; h < t.numChildren; h++) {
						var d = t.getChildAt(h);
						this.setAlalbedo(d, e, i, s, a)
					}
			}
		}
		receiveShadow(t) {
			for (var e = 0; e < t.numChildren; e++) {
				var i = t.getChildAt(e);
				i instanceof Laya.MeshSprite3D ? i.meshRender.receiveShadow = !0 : i instanceof Laya.SkinnedMeshSprite3D && (i.skinnedMeshRender.receiveShadow = !0)
			}
		}
		showShashow(t, e) {
			e = null == e || e;
			for (var i = 0; i < t.numChildren; i++) {
				var s = t.getChildAt(i);
				s instanceof Laya.MeshSprite3D ? s.meshRender.castShadow = e : s instanceof Laya.SkinnedMeshSprite3D && (s.skinnedMeshRender.castShadow = e), s.numChildren > 0 && this.showShashow(s, e)
			}
		}
		resetOutLine(t, e, i) { }
		playAnim(t, e, i, s, a, n, o) {
			let r = t.getComponent(Laya.Animator);
			if (o || (o = 0), r) {
				n ? r.crossFade(e, n, o) : r.play(e, o);
				var h = r._controllerLayers[0]._statesMap[e];
				h.script || (h.addScript(l), h.script = h._scripts[0]), a || (a = 1), h.speed = a, s && (s = s.bind(i)), h.script.setComplete(s), t.curAnim = e, t.curAnimSpeed = a
			} else console.error(t, "动作控制器未加载！"), s && s.call(i)
		}
		stopAnim(t, e) {
			let i = t.getChildAt(0).getComponent(Laya.Animator);
			i && (e || (e = t.curAnim), e && (i._controllerLayers[0]._statesMap[e].speed = 0))
		}
		clearAnim(t) {
			t.getChildAt(0).getComponent(Laya.Animator)._controllerLayers[0]._statesMap = []
		}
		setMaterialPic(t, e) {
			if (t && e) {
				if (t instanceof Laya.MeshSprite3D) var i = t.meshRenderer;
				else if (t instanceof Laya.SkinnedMeshSprite3D) i = t.skinnedMeshRenderer;
				if (i)
					if (i.material) Laya.Texture2D.load(e, Laya.Handler.create(this, function (t) {
						null != i._owner && (i.material.albedoTexture = t)
					}));
					else {
						var s = new Laya.BlinnPhongMaterial;
						Laya.Texture2D.load(e, Laya.Handler.create(this, function (t) {
							s.albedoTexture = t, s.albedoIntensity = 1
						})), i.material = s
					} for (var a = 0; a < t.numChildren; a++) this.setMaterialPic(t._children[a], e)
			}
		}
		addMeshCollider(t, e) {
			if (e || (t.colliders = [], e = t.colliders), t.meshFilter) {
				var i = t.addComponent(Laya.PhysicsCollider);
				let s = new Laya.MeshColliderShape;
				s.mesh = t.meshFilter.sharedMesh, i.colliderShape = s, e.push(i)
			}
			for (var s = t.numChildren, a = 0; a < s; a++) this.addMeshCollider(t._children[a], e)
		}
		static getIns() {
			return this._ins || (this._ins = new d), this._ins
		}
	}
	window.ModelCfg = d;
	class c extends Laya.Script3D {
		constructor() {
			super()
		}
		onAwake() {
			this.owner.baseX = Laya.stage.width / 2, this.owner.baseY = Laya.stage.height / 2, this.owner.script = this, this.moveCD = utils.random(2, 6), this.isRelease = !0
		}
		onStart() {
			this.playAni(this.owner, "Idel", null, !0)
		}
		onUpdate() {
			this.moveCD -= G.FRAME_INTERVAL, this.moveCD < 0 && this.isRelease && (this.move(), this.moveCD = 100), this.bkY != this.owner.baseY && (this.owner.shadow ? d.getIns().setLocalScale(this.owner, 1 - .3 * (800 - this.owner.baseY) / 450) : d.getIns().setLocalScale(this.owner, 2 - .6 * (800 - this.owner.baseY) / 450), this.bkY = this.owner.baseY)
		}
		move() {
			this.timeline = utils.getTimeLine(Handler.create(this, function () {
				this.timeline = null, this.moveCD = utils.random(2, 6), this.owner && (utils.random(0, 3) ? this.playAni(this.owner, "Idel", null, !0) : this.playAni(this.owner, "Roar", function () {
					this.playAni(this.owner, "Idel", null, !0)
				}.bind(this), !1))
			}));
			let t = utils.random(100, Laya.stage.width - 100),
				e = utils.random(350, 800);
			t > this.owner.baseX ? this.owner.shadow ? d.getIns().setLocalRotation(this.owner, 0, 45, 0) : d.getIns().setLocalRotation(this.owner, 0, -135, 0) : this.owner.shadow ? d.getIns().setLocalRotation(this.owner, 0, -45, 0) : d.getIns().setLocalRotation(this.owner, 0, 135, 0);
			let i = Math.sqrt((t - this.owner.baseX) * (t - this.owner.baseX) + (e - this.owner.baseY) * (e - this.owner.baseY)) / 100;
			this.timeline.to(this.owner, {
				baseX: t,
				baseY: e
			}, 1e3 * i, null, 0).play(0, !1), this.playAni(this.owner, "Move", null, !0)
		}
		beCatch() {
			this.timeline && (this.timeline.pause(), this.timeline.destroy(), this.timeline = null), this.isRelease = !1, this.owner.baseY -= 100, this.owner.shadow && (this.owner.shadow.transform.localPositionY = -3), this.playAni(this.owner, "Move", null, !0)
		}
		release() {
			this.isRelease = !0, this.owner.baseY += 100, this.moveCD = utils.random(2, 6), this.owner.shadow ? (this.owner.shadow.transform.localPositionY = 0, this.playAni(this.owner, "StandUp", function () {
				utils.random(0, 3) ? this.playAni(this.owner, "Idel", null, !0) : this.playAni(this.owner, "Roar", function () {
					this.playAni(this.owner, "Idel", null, !0)
				}.bind(this), !1)
			}.bind(this), !0, 2)) : this.playAni(this.owner, "FallDown", function () {
				utils.random(0, 3) ? this.playAni(this.owner, "Idel", null, !0) : this.playAni(this.owner, "Roar", function () {
					this.playAni(this.owner, "Idel", null, !0)
				}.bind(this), !1)
			}.bind(this), !1)
		}
		playAni(t, e, i, s, a, n) {
			let o = t.getChildAt(0)._hierarchyAnimator;
			if (o) {
				n ? o.crossFade(e, n, 0, 0) : o.play(e, 0, 0);
				var r = o._controllerLayers[0]._statesMap[e];
				r.script || (r.addScript(l), r.script = r._scripts[0], r.script.loop = s || r._clip.islooping, r.script.animator = o, r.script.animName = e), a || (a = 1), r.speed = a, r.script.setComplete(i), this.curAnim = o.curAnim = e
			} else console.error(this.owner, "动作控制器未加载！")
		}
	}
	class u extends t {
		constructor() {
			super(), G.d = this
		}
		initData() {
			for (var t in this.clickPos = {
				x: 0,
				y: 0
			}, this.up = !1, this.tempVec3 = new Laya.Vector3, this.point = new Laya.Vector2, this.out = new Laya.HitResult, this._ray = new Laya.Ray(new Laya.Vector3(0, 0, 0), new Laya.Vector3(0, 0, 0)), this.curZooIndex = 0, this.dinosaurArr = [], this.selectID = null, this.updateSYCD = 0, this.ck = [], this.yq = [], D.dinosaurIsland) 1 == D.dinosaurIsland[t].type ? this.yq.push(D.dinosaurIsland[t]) : this.ck.push(D.dinosaurIsland[t]);
			audioManager.playMusic(18), this.roleArr = []
		}
		setDinoData() {
			this.showDino = [], this.sleepDino = [];
			for (var t = 0; t < playerData.getIns().ownDino.length; t++) {
				let e = playerData.getIns().ownDino[t];
				e.isShow ? this.showDino.push({
					index: e.index,
					id: e.id,
					seat: e.seat
				}) : this.sleepDino.push({
					index: e.index,
					id: e.id
				})
			}
			this.boxNum = playerData.getIns().dinosaurNum;
			for (t = 0; t < this.boxNum; t++) this.sleepDino[t] || this.sleepDino.push(0);
			this.boxNum < 10 && this.sleepDino.push(-1);
			for (t = 0; t < this.showDino.length; t++) this.createDino(this.showDino[t]);
			this.list_box.array = this.sleepDino
		}
		addRole() {
			let t = new r("sk/role_0" + utils.random(1, 3) + ".sk", function (e) {
				this.box_bg.addChild(e), e.z = this.box_scene.height - utils.random(0, 75), e.x = utils.random(200, Laya.stage.width * this.gridNum), e.targetX = utils.random(200, Laya.stage.width * this.gridNum), e.isIdle = 1 == utils.random(0, 1), e.speed = utils.random(20, 30), e.node = t, e.isIdle ? (e.idleCD = utils.random(1, 4), e.node.play("idle")) : e.node.play("walk"), e.pos(e.x, e.z), e.zOrder = e.z, this.roleArr.push(e)
			}.bind(this))
		}
		initUI() {
			this.ani2.play(0, !0), this.box_unlock.visible = !1, this.label_num.text = playerData.getIns().gold, this.createZoo(), this.init3DScene(), updateManager.frameLoop(1, this, this.loop), 0 == s.getIns().zooLv ? utils.getChildDeep(this.box_unlock, "label_tag").text = "免费解锁当前位置" : s.getIns().zooLv < 10 && (utils.getChildDeep(this.box_unlock, "label_tag").text = "解锁当前位置需要消耗" + this.yq[s.getIns().zooLv].price + "金币确定解锁吗")
		}
		initEvent() {
			utils.onBtnScaleEvent(this.btn_close, this, function () {
				this.doClose(), G.MainUI.box_scene.visible = !0, audioManager.playMusic(1), window.uleeSDK && "wx" == uleeSDK.pf && uleeSDK.showBox(Laya.stage.height - 200)
			}), utils.onBtnScaleEvent(this.box_sy, this, function () {
				let t = playerData.getIns().totalIncome;
				utils.createCoinAnim2({
					x: this.box_sy.x,
					y: this.box_sy.y
				}, {
					x: this.box_coin.x,
					y: this.box_coin.y
				}, function () {
					this.label_num.destroyed || (this.label_num.text = playerData.getIns().gold)
				}.bind(this), t > 15 ? 15 : t), playerData.getIns().getIncome(), this.updateGold(), this.box_sy.visible = !1
			}), utils.onBtnScaleEvent(this.btn_del, this, function () {
				this.delMode ? (this.img_del2.skin = "common/img_huishou.png", this.img_deldi.visible = !1, this.delMode = !1) : (this.img_del2.skin = "common/img_xX.png", this.img_deldi.visible = !0, this.delMode = !0), this.setDinoData()
			}), this.box_bg.on(Laya.Event.MOUSE_DOWN, this, this.onDown), this.box_bg.on(Laya.Event.MOUSE_MOVE, this, this.onMove), this.box_bg.on(Laya.Event.MOUSE_UP, this, this.onUp), utils.listHandler(this.list_box, this, this.renderHandler, this.selectHandler), utils.onBtnScaleEvent(utils.getChildDeep(this.box_unlock, "btn_close"), this, function () {
				this.box_unlock.visible = !1
			}), utils.onBtnScaleEvent(utils.getChildDeep(this.box_unlock, "btn_ok"), this, function () {
				var t = this.yq[s.getIns().zooLv];
				if (t) {
					if (s.getIns().gold < t.price) return void utils.prompt("Insufficient Coin");
					s.getIns().addGold(-t.price), this.label_num.text = playerData.getIns().gold, s.getIns().addZoo(), this.box_unlock.visible = !1, 0 == s.getIns().zooLv ? utils.getChildDeep(this.box_unlock, "label_tag").text = "免费解锁当前位置" : s.getIns().zooLv < 10 && (utils.getChildDeep(this.box_unlock, "label_tag").text = "解锁当前位置需要消耗" + this.yq[s.getIns().zooLv].price + "金币确定解锁吗"), s.getIns().zooLv > 0 && (this.label_sx.text = "Maximum Storage：" + this.yq[s.getIns().zooLv - 1].limit), this.createZoo(), this.setDinoData()
				}
			})
		}
		renderHandler(t) {
			let e = t.dataSource,
				i = utils.getChildDeep(t, "img_icon");
			if (-1 == e) i.skin = "common/img_kaiqi.png", t.skin = "common/img_di26.png";
			else if (0 == e) i.skin = "common/img_jh.png", t.skin = "common/img_di26.png";
			else {
				this.delMode ? t.skin = "common/img_kuang04.png" : t.skin = "common/img_di26.png";
				var s = D.dinoConfig[e.id];
				i.skin = s.icon
			}
		}
		selectHandler(t) {
			let e = this;
			this.list_box.selectedIndex = -1;
			let i = this.list_box._cells[t];
			if (i) {
				let t = i.dataSource;
				if (this.selectItem && (this.selectItem.skin = "common/img_di26.png", this.selectItem = null), 0 == t) {
					if (this.delMode) return void utils.prompt("请退出放生模式，再进行其他操作！");
					uiManager.openUI("game/DialogView.scene", this, {
						title: "跳转提示",
						content: "有多余仓库容纳恐龙, 是否前往研究所，合成更多恐龙！",
						success: function () {
							uiManager.openUI("game/StudyView.scene"), this.doClose()
						}.bind(this)
					})
				} else if (-1 == t) {
					if (this.delMode) return void utils.prompt("请退出放生模式，再进行其他操作！");
					var a = this.ck[s.getIns().dinosaurNum];
					a && uiManager.openUI("game/DialogView.scene", this, {
						title: "加仓提示",
						content: "是否花费" + a.price + "金币，加大仓库容量！",
						success: function () {
							s.getIns().gold < a.price ? utils.prompt("Insufficient Coin,无法扩大仓库") : (audioManager.playSound(5, null, !1), s.getIns().addGold(-a.price), this.label_num.text = playerData.getIns().gold, s.getIns().addDinosaurNum(), e.setDinoData())
						}.bind(this)
					})
				} else if (this.delMode) {
					let i = D.dinoConfig[t.id];
					uiManager.openUI("game/DialogView.scene", this, {
						title: "放生提示",
						content: "是否确定要放生该恐龙（" + i.des + "）？",
						isTip: !0,
						success: function () {
							playerData.getIns().delDinosaurType(t.index), e.setDinoData()
						}
					})
				} else {
					if (0 == this.curZooIndex) return void utils.prompt("该区域是公园入口，不能放置恐龙！");
					if (this.curZooIndex > playerData.getIns().zooLv) return void utils.prompt("该区域是未被开发！");
					playerData.getIns().setShowDino(t.index, this.curZooIndex), this.setDinoData(), this.label_tsy.text = Math.ceil(20 * dataManager.getZooRevenue()) + "金币/分钟"
				}
			}
		}
		loop() {
			let t = G.FRAME_INTERVAL;
			if (this.up) {
				var e = -this.curZooIndex * Laya.stage.width;
				this.box_bg.x > e ? (this.box_bg.x -= 2e3 * t, this.box_bg.x <= e && (this.box_bg.x = e, this.up = !1, this.dir = 0)) : this.box_bg.x < e ? (this.box_bg.x += 2e3 * t, this.box_bg.x >= e && (this.box_bg.x = e, this.up = !1, this.dir = 0)) : (this.up = !1, this.dir = 0), this.up || 0 != this.curZooIndex || playerData.getIns().totalIncome > 0 && (this.box_sy.visible = !0)
			}
			for (var i = 0; i < this.dinosaurArr.length; i++) {
				let t = this.dinosaurArr[i];
				var s = t.followNode;
				let e = utils.transPos(s, this);
				t.active || (t.active = !0), this.tempVec3.x = e.x + t.baseX, this.tempVec3.y = e.y + t.baseY, this.tempVec3.z = 0, this.camera.convertScreenCoordToOrthographicCoord(this.tempVec3, this.tempVec3), this.dinosaurArr[i].transform.localPositionX = this.tempVec3.x, this.dinosaurArr[i].transform.localPositionY = this.tempVec3.y, this.dinosaurArr[i].transform.localPositionZ = this.tempVec3.z
			}
			this.updateSYCD -= t, this.updateSYCD <= 0 && this.updateGold();
			for (i = 0; i < this.roleArr.length; i++) {
				let e = this.roleArr[i];
				e.isIdle ? (e.idleCD -= t, e.idleCD <= 0 && (e.isIdle = !1, e.node.play("walk"))) : e.x < e.targetX ? (e.x += t * e.speed, e.scaleX = 1, e.x >= e.targetX && (e.targetX = utils.random(200, Laya.stage.width * this.gridNum), e.isIdle = 1 == utils.random(0, 1), e.isIdle ? (e.idleCD = utils.random(1, 4), e.node.play("idle")) : e.node.play("walk"))) : e.x >= e.targetX && (e.x -= t * e.speed, e.scaleX = -1, e.x <= e.targetX && (e.targetX = utils.random(200, Laya.stage.width * this.gridNum), e.isIdle = 1 == utils.random(0, 1), e.isIdle ? (e.idleCD = utils.random(1, 4), e.node.play("idle")) : e.node.play("walk")))
			}
		}
		onDown(t) {
			this.box_tag.visible && (this.box_tag.visible = !1), this.point.x = Laya.MouseManager.instance.mouseX, this.point.y = Laya.MouseManager.instance.mouseY, this.camera.viewportPointToRay(this.point, this._ray), this.newScene.physicsSimulation.rayCast(this._ray, this.out), this.out.succeeded ? (this.isTouchDino = !0, this.catchDino = this.out.collider.owner, this.catchDino.script.beCatch()) : (this.isTouchBG = !0, this.up = !1, this.dir = 0), this.clickPos.x = t.stageX, this.clickPos.y = t.stageY, this.box_sy.visible = !1, this.arrow && (this.arrow.visible = !1)
		}
		onMove(t) {
			this.isTouchBG ? (this.box_bg.x += t.stageX - this.clickPos.x, this.box_bg.x < -(this.gridNum - 1) * Laya.stage.width ? this.box_bg.x = -(this.gridNum - 1) * Laya.stage.width : this.box_bg.x > 0 && (this.box_bg.x = 0), t.stageX - this.clickPos.x > 10 ? this.dir ? t.stageX - this.clickPos.x > this.dir && (this.dir = 10) : this.dir = 10 : t.stageX - this.clickPos.x < -10 && (this.dir ? t.stageX - this.clickPos.x < this.dir && (this.dir = -10) : this.dir = -10)) : this.isTouchDino && (this.catchDino.baseX += t.stageX - this.clickPos.x, this.catchDino.baseY += t.stageY - this.clickPos.y, this.catchDino.baseY < 200 ? (this.catchDino.baseY = 200, this.onUp()) : this.catchDino.baseY > 700 && (this.catchDino.baseY = 700, this.onUp()), this.catchDino.baseX < 100 ? this.catchDino.baseX = 100 : this.catchDino.baseX > Laya.stage.width - 100 && (this.catchDino.baseX = Laya.stage.width - 100)), this.clickPos.x = t.stageX, this.clickPos.y = t.stageY
		}
		onUp(t) {
			this.isTouchBG ? (this.isTouchBG = !1, this.up = !0, this.dir < 0 ? (this.curZooIndex++, this.curZooIndex > this.gridNum - 1 && (this.curZooIndex = this.gridNum - 1)) : this.dir > 0 && (this.curZooIndex--, this.curZooIndex < 0 && (this.curZooIndex = 0))) : this.isTouchDino && (this.isTouchDino = !1, this.catchDino.script.release())
		}
		updateGold() {
			this.label_sy.text = playerData.getIns().totalIncome, this.updateSYCD = 3, this.up || 0 != this.curZooIndex || playerData.getIns().totalIncome > 0 && (this.box_sy.visible = !0)
		}
		createZoo(t) {
			for (var e = 0; e < this.box_bg._children.length; e++) this.box_bg._children[e].node || (this.unShowDino(e), this.box_bg._children[e].destroy());
			this.bgArr = [];
			var i = playerData.getIns().zooLv;
			if (t && (i = 1), i < 10) {
				i += 1;
				var s = !0
			}
			i += 1, this.gridNum = i;
			for (e = 0; e < this.gridNum; e++) this.createZooNode(e * Laya.stage.width, 0 == e, e == this.gridNum - 1 && s);
			if (this.box_bg.x = -this.curZooIndex * Laya.stage.width, this.box_sy.x = Laya.stage.width / 2 - 50, this.box_sy.y = Laya.stage.height / 2 - 270, this.ani1.play(0, !0), 0 == this.roleArr.length) {
				let t = utils.random(5, 8);
				for (e = 0; e < t; e++) this.addRole()
			}
		}
		createZooNode(t, e, i) {
			if (e) {
				o = new Laya.Image("bg/img_bg5.jpg");
				var a = new Laya.Image("bg/img_shoupiaoting.png");
				o.addChild(a), a.pos(Laya.stage.width / 2 - 170, Laya.stage.height / 2 - 250);
				l = new Laya.Image("common/img_paibian.png");
				o.addChild(l), l.pos(Laya.stage.width - 200, Laya.stage.height / 2 - 70), l.scaleX = .7, l.scaleY = .7;
				h = new Laya.Label("园区收益");
				l.addChild(h), h.font = "SimHei", h.fontSize = 35, h.color = "#FFF", h.pos(50, 20);
				d = new Laya.Label(Math.ceil(20 * dataManager.getZooRevenue()) + "金币/分钟");
				if (l.addChild(d), d.font = "SimHei", d.fontSize = 30, d.align = "center", d.width = 200, d.color = "#FFF", d.pos(30, 65), s.getIns().zooLv > 0) var n = new Laya.Label("储存上限：" + this.yq[s.getIns().zooLv - 1].limit);
				else n = new Laya.Label;
				l.addChild(n), n.font = "SimHei", n.fontSize = 30, n.align = "center", n.width = 200, n.color = "#FFF", n.pos(50, 100), this.label_sx = n, this.label_tsy = d
			} else {
				var o = new Laya.Image("bg/img_bg3.jpg"),
					r = new Laya.Image("bg/zhalan.png");
				o.addChild(r), r.y = 300, r.x = -35;
				var l = new Laya.Image("common/img_paibian.png");
				o.addChild(l), l.pos(Laya.stage.width - 200, Laya.stage.height / 2), l.scaleX = .7, l.scaleY = .7;
				var h = new Laya.Label;
				o.dinoName = h, l.addChild(h), h.font = "SimHei", h.fontSize = 35, h.color = "#FFF", h.pos(50, 20);
				var d = new Laya.Label;
				o.dinoSY = d, l.addChild(d), d.font = "SimHei", d.fontSize = 30, d.align = "center", d.width = 200, d.color = "#FFF", d.pos(30, 65)
			}
			if (this.box_bg.addChild(o), this.bgArr.push(o), o.width = Laya.stage.width, o.height = Laya.stage.height, o.x = t, i) {
				var c = new Laya.Box;
				o.addChild(c), c.left = 0, c.right = 0, c.top = 0, c.bottom = 0;
				var u = new Laya.Image("common/img_paibian.png");
				c.addChild(u), u.centerX = 0, u.centerY = -200;
				h = new Laya.Label("土地出售");
				u.addChild(h), h.font = "SimHei", h.fontSize = 40, h.color = "#FFF", h.pos(65, 20);
				var p = new Laya.Image("common/img_btn3.png");
				if (u.addChild(p), p.centerX = 0, p.centerY = 0, 0 == s.getIns().zooLv) {
					(h = new Laya.Label("免费解锁")).right = 38
				} else {
					(h = new Laya.Label(this.yq[s.getIns().zooLv].price)).right = 25;
					var g = new Laya.Image("common/img_coin.png");
					p.addChild(g), g.centerY = -5, g.left = 25
				}
				p.addChild(h), h.font = "SimHei", h.fontSize = 35, h.color = "#FFF", h.centerY = -5, utils.onBtnScaleEvent(p, this, function () {
					this.box_unlock.visible = !0
				}.bind(this))
			} else dataManager.checkZooNum(this.curZooIndex)
		}
		init3DScene() {
			this.newScene = this.box_scene.addChild(new Laya.Scene3D), this.camera = cameraUtils.createCamera(new Laya.Vector3(0, 19, 30), new Laya.Vector3(-30, 0, 0)), this.camera.orthographic = !0, this.camera.clearFlag = Laya.BaseCamera.CLEARFLAG_DEPTHONLY, this.camera.orthographicVerticalSize = 40, this.newScene.addChild(this.camera), this.newScene.ambientColor = new Laya.Vector3(.6, .6, .6);
			var t = new Laya.DirectionLight;
			this.newScene.addChild(t), t.color = new Laya.Vector3(1, 1, .705), t.intensity = .9, t.transform.position = new Laya.Vector3(1.41, 10.65, -17.23), t.transform.rotationEuler = new Laya.Vector3(-45, 60, 0), this.setDinoData()
		}
		createDino(t) {
			this.unShowDino(t.seat), this["lock" + t.seat] = !0, d.getIns().getModelById(t.id, function (e) {
				if (this.newScene.addChild(e), e.dinoData = t, e.active = !1, e.followNode = this.bgArr[t.seat], 30002 == t.id || 30003 == t.id) e._children[8].getComponent(Laya.PhysicsCollider).destroy(), d.getIns().setLocalRotation(e, 0, -45, 0), e.shadow = e._children[8];
				else if (30010 == t.id) {
					let t = e.addComponent(Laya.PhysicsCollider),
						i = new Laya.BoxColliderShape(3, 2, 2);
					d.getIns().setLocalRotation(e, 0, 135, 0), d.getIns().setLocalScale(e, 2), i._localOffset.y = .5, t.colliderShape = i
				} else e._children[6].getComponent(Laya.PhysicsCollider).destroy(), d.getIns().setLocalRotation(e, 0, -45, 0), e.shadow = e._children[6];
				this.dinosaurArr.push(e), e.baseX = Laya.stage.width / 2, e.baseY = Laya.stage.height / 2 - 200, e.addComponent(c), this.bgArr[t.seat].dino = e, this["lock" + t.seat] = !1;
				let i = D.dinoConfig[t.id];
				this.bgArr[t.seat].dinoName.text = i.des, this.bgArr[t.seat].dinoSY.text = i.goldKLD + "Coin/Minute"
			}.bind(this))
		}
		unShowDino(t) {
			this.bgArr[t].dino && (this.dinosaurArr.remove(this.bgArr[t].dino), this.bgArr[t].dino.destroy(), this.bgArr[t].dino = null)
		}
		doClose() {
			G.MainUI.updateCoin(), super.doClose()
		}
	}
	class p extends t {
		constructor() {
			super()
		}
		initData() { }
		initUI() { }
		initEvent() {
			utils.onBtnScaleEvent(this.btn_close, this, function () {
				this.doClose(), this.argObj && this.argObj.callback && this.argObj.callback(!1)
			}), utils.onBtnScaleEvent(this.btn_get, this, function () {
				uleeSDK ? (audioManager.setMusicMuted(!1), uleeSDK.showVideoAD(this.addTL, function () {
					utils.prompt("Can't get rewards if you haven't watched the video"), audioManager.huifuMusicMuted()
				})) : (this.addTL(), audioManager.huifuMusicMuted())
			})
		}
		addTL() {
			s.getIns().addDigNum(5), this.doClose(), this.argObj && this.argObj.callback && this.argObj.callback(!0)
		}
		doClose() {
			super.doClose(), G.MainUI.updateDig()
		}
	}
	class g extends t {
		constructor() {
			super(), G.GuideUI = this
		}
		initUI() {
			this.img_bg.cacheAs = "bitmap", this.interactionArea = new Laya.Sprite, this.img_bg.addChild(this.interactionArea), this.interactionArea.blendMode = "destination-out", this.interactionArea.graphics.clear(), this.interactionArea.graphics.drawCircle(this.argObj.x, this.argObj.y, 100, "#000000"), this.label_txt.text = this.argObj.txt ? this.argObj.txt : "", this.label_txt.centerX = 0, this.label_txt.y = this.argObj.y - 230, this.img_hand.x = this.argObj.x - 50, this.img_hand.y = this.argObj.y + 50, this.img_touch.x = this.argObj.x - 100, this.img_touch.y = this.argObj.y - 100, this.alpha = 0, updateManager.timeOnce(.5, this, function () {
				this.alpha = 1
			})
		}
		initData() { }
		initEvent() {
			var t = this;
			let e = new Laya.TimeLine;
			e.to(this.img_hand, {
				x: this.argObj.x - 100,
				y: this.argObj.y + 100
			}, 500, null, 0).to(this.img_hand, {
				x: this.argObj.x - 50,
				y: this.argObj.y + 50
			}, 500, null, 0).to(this.img_hand, {
				scaleX: .8,
				scaleY: .8
			}, 200, null, 0).to(this.img_hand, {
				scaleX: 1,
				scaleY: 1
			}, 200, null, 0), e.play(0, !0), this.img_touch.on(Laya.Event.MOUSE_DOWN, this, function () {
				e.pause(), e.destroy(), t.doClose()
			})
		}
		doClose() {
			super.doClose(), G.GuideUI = null, this.argObj && this.argObj.callback && this.argObj.callback()
		}
	}
	class m extends t {
		constructor() {
			super(), this.loadItems = [], this.currItem = null, this.value = 0, this.count = 0, this.currCount = 0, this.countMax = 0
		}
		initUI() {
			super.initUI.call(this), this.updateKey = updateManager.frameLoop(1, this, this.update)
		}
		addItem(t) {
			this.countMax += t.count, this.loadItems.push(t), t.loading = this
		}
		updateProgress() {
			this.value = this.count / this.countMax, this.value >= 1 && this.onLoaded()
		}
		update() {
			if (null == this.currItem)
				if (0 == this.loadItems.length) {
					if (this.count >= this.countMax) return
				} else this.count >= this.currCount && (this.currItem = this.loadItems.shift(), this.currItem.start());
			else this.currItem.loaded ? (this.currCount += this.currItem.count, this.currItem = null) : this.currItem.checkFn && this.currItem.checkFn();
			this.count < this.currCount && this.count++, this.updateProgress()
		}
		onLoaded() {
			updateManager.clear(this.updateKey, this)
		}
	}
	class f extends m {
		constructor() {
			super(), this.autoDestroyAtClosed = !0
		}
		initUI() {
			super.initUI.call(this), this.value1 = .01, this.ani1.play(0, !0), Laya.timer.frameLoop(1, this, this.loop), this.addItem(new ulee.LoadItem(function () {
				var t = this;
				window.uleeSDK && "wx" == uleeSDK.pf ? uleeSDK.initSDK({
					platform: "wx",
					appid: "wx58e521bd923ec47b"
				}, function () {
					t.onComplete()
				}) : this.onComplete()
			}, 10)), this.addItem(new ulee.LoadItem(function () {
				var t = this;
				window.uleeSDK && "wx" == uleeSDK.pf ? wx.loadSubpackage({
					name: "atlas",
					success: function (e) {
						console.log("atlas分包加载完毕"), t.onComplete()
					},
					fail: function (t) {
						console.log("分包加载失败", t)
					}
				}) : window.uleeSDK && "tt" == uleeSDK.pf ? tt.loadSubpackage({
					name: "atlas",
					success: function (e) {
						console.log("atlas分包加载完毕"), t.onComplete()
					},
					fail: function (t) {
						console.log("atlas分包加载失败", t)
					}
				}) : this.onComplete()
			}, 10)), this.addItem(new ulee.LoadItem(function () {
				var t = this;
				window.uleeSDK && "wx" == uleeSDK.pf ? wx.loadSubpackage({
					name: "dinoModel",
					success: function (e) {
						console.log("dinoModel分包加载完毕"), G.loadDino = !0, t.onComplete()
					},
					fail: function (t) {
						console.log("分包加载失败", t)
					}
				}) : window.uleeSDK && "tt" == uleeSDK.pf ? tt.loadSubpackage({
					name: "dinoModel",
					success: function (e) {
						console.log("dinoModel分包加载完毕"), G.loadDino = !0, t.onComplete()
					},
					fail: function (t) {
						console.log("dinoModel分包加载失败", t)
					}
				}) : (G.loadDino = !0, this.onComplete())
			}, 10)), this.addItem(new ulee.LoadItem(function () {
				window.uleeSDK && "wx" == uleeSDK.pf ? wx.loadSubpackage({
					name: "level",
					success: function (t) {
						console.log("level分包加载完毕")
					},
					fail: function (t) {
						console.log("分包加载失败", t)
					}
				}) : window.uleeSDK && "tt" == uleeSDK.pf && tt.loadSubpackage({
					name: "level",
					success: function (t) {
						console.log("level分包加载完毕")
					},
					fail: function (t) {
						console.log("level分包加载失败", t)
					}
				}), this.onComplete()
			}, 10)), this.addItem(new ulee.LoadItem(function () {
				window.uleeSDK && "wx" == uleeSDK.pf ? wx.loadSubpackage({
					name: "model",
					success: function (t) {
						console.log("model分包加载完毕")
					},
					fail: function (t) {
						console.log("分包加载失败", t)
					}
				}) : window.uleeSDK && "tt" == uleeSDK.pf && tt.loadSubpackage({
					name: "model",
					success: function (t) {
						console.log("model分包加载完毕")
					},
					fail: function (t) {
						console.log("model分包加载失败", t)
					}
				}), this.onComplete()
			}, 10)), this.addItem(new ulee.LoadItem(function () {
				window.uleeSDK && "wx" == uleeSDK.pf ? wx.loadSubpackage({
					name: "gunModel",
					success: function (t) {
						console.log("gunModel分包加载完毕")
					},
					fail: function (t) {
						console.log("分包加载失败", t)
					}
				}) : window.uleeSDK && "tt" == uleeSDK.pf && tt.loadSubpackage({
					name: "gunModel",
					success: function (t) {
						console.log("gunModel分包加载完毕")
					},
					fail: function (t) {
						console.log("gunModel分包加载失败", t)
					}
				}), this.onComplete()
			}, 10)), this.addItem(new ulee.LoadItem(function () {
				var t = this;
				window.uleeSDK && "wx" == uleeSDK.pf ? wx.loadSubpackage({
					name: "effect",
					success: function (e) {
						console.log("effect分包加载完毕"), t.onComplete()
					},
					fail: function (t) {
						console.log("分包加载失败", t)
					}
				}) : window.uleeSDK && "tt" == uleeSDK.pf ? tt.loadSubpackage({
					name: "effect",
					success: function (e) {
						console.log("effect分包加载完毕"), t.onComplete()
					},
					fail: function (t) {
						console.log("effect分包加载失败", t)
					}
				}) : this.onComplete()
			}, 10)), this.addItem(new ulee.LoadItem(function () {
				var t = this;
				window.uleeSDK && "wx" == uleeSDK.pf ? wx.loadSubpackage({
					name: "first",
					success: function (e) {
						console.log("first分包加载完毕"), t.onComplete()
					},
					fail: function (t) {
						console.log("分包加载失败", t)
					}
				}) : window.uleeSDK && "tt" == uleeSDK.pf ? tt.loadSubpackage({
					name: "first",
					success: function (e) {
						console.log("first分包加载完毕"), t.onComplete()
					},
					fail: function (t) {
						console.log("first分包加载失败", t)
					}
				}) : this.onComplete()
			}, 10)), this.addItem(new ulee.LoadItem(function () { }, 10, function () {
				if (G.loadDino) {
					var t = this;
					if (Laya.Browser.onMiniGame) {
						if (!G.unzip) {
							G.unzip = !0, wx.getFileSystemManager().unzip({
								zipFilePath: "/res/dinoModel/pack.zip",
								targetPath: wx.env.USER_DATA_PATH,
								success: function (e) {
									console.log("解压成功", e), t.onComplete()
								}.bind(this),
								fail: function (t) {
									console.log("解压失败", t)
								},
								complete: function (t) {
									console.log("解压完毕", t)
								}
							})
						}
					} else this.onComplete()
				}
			})), this.addItem(new ulee.LoadItem(function () {
				var t = this;
				uiManager.openUI("game/MainView.scene", null, {
					callback: function () {
						t.onComplete()
					}
				})
			}, 10)), this.addItem(new ulee.LoadItem(function () {
				1 == playerData.getIns().level && s.getIns().guideStep < 1 && uiManager.openUI("game/StoryView.scene"), this.onComplete()
			}, 10)), this.addItem(new ulee.LoadItem(function () {
				this.onComplete()
			}, 100))
		}
		loop() {
			this.value1 += .01, this.value1 > 1 && (this.value1 = .01), this.bar_loading.value = this.value1
		}
		updateProgress() {
			super.updateProgress.call(this)
		}
		onLoaded() {
			super.onLoaded.call(this), Laya.timer.clear(this, this.loop), 1 == playerData.getIns().level && s.getIns().guideStep < 1 || (uiManager.getUI("game/MainView.scene").visible = !0, uiManager.getUI("game/MainView.scene").updateUI(!1), window.uleeSDK && "wx" == uleeSDK.pf && uleeSDK.showBox(Laya.stage.height - 200)), window.uleeSDK && "wx" == uleeSDK.pf ? wx.loadSubpackage({
				name: "music",
				success: function (t) {
					console.log("music分包加载完毕")
				},
				fail: function (t) {
					console.log("music分包加载失败", t)
				}
			}) : window.uleeSDK && "tt" == uleeSDK.pf && tt.loadSubpackage({
				name: "music",
				success: function (t) {
					console.log("music分包加载完毕")
				},
				fail: function (t) {
					console.log("music分包加载失败", t)
				}
			}), G.LOADMUSIC = !0, audioManager.playMusic(1), this.doClose()
		}
		showMH() { }
	}
	class y extends t {
		constructor() {
			super(), G.MainUI = this
		}
		initUI() {
			this.visible = !1, this.argObj.callback(), this.ani1.play(0, !0), this.ani2.play(0, !0), G.COINPOS = {
				x: this.box_coin.x,
				y: this.box_coin.y
			}, s.getIns().isSound ? this.btn_sound.skin = "common/img_sound_on.png" : this.btn_sound.skin = "common/img_sound_off.png", s.getIns().isVibrate ? this.btn_vibrate.skin = "common/img_vibrate_on.png" : this.btn_vibrate.skin = "common/img_vibrate_off.png", this.updateLv(), this.initUpBtns(), this.updateCoin(), this.updateDig()
		}
		initData() { }
		initEvent() {
			var t = this;
			utils.onBtnScaleEvent(this.btn_sound, this, function () {
				s.getIns().isSound ? (G.ISSOUND = !1, s.getIns().setSound(!1), audioManager.setMusicMuted(!1), this.btn_sound.skin = "common/img_sound_off.png") : (G.ISSOUND = !0, s.getIns().setSound(!0), audioManager.setMusicMuted(!0), this.btn_sound.skin = "common/img_sound_on.png")
			}), utils.onBtnScaleEvent(this.btn_vibrate, this, function () {
				s.getIns().isVibrate ? (s.getIns().setVibrate(!1), this.btn_vibrate.skin = "common/img_vibrate_off.png") : (s.getIns().setVibrate(!0), window.uleeSDK, this.btn_vibrate.skin = "common/img_vibrate_on.png")
			}), utils.onBtnScaleEvent(this.btn_start, this, this.onStart), utils.onBtnScaleEvent(this.btn_shop, this, function () {
				window.uleeSDK && uleeSDK.showAD(!1), uiManager.openUI("game/ShopView.scene", null, {
					callback: () => {
						window.uleeSDK && uleeSDK.showAD(!0), this.initUpBtns()
					}
				})
			}), utils.onBtnScaleEvent(this.btn_getCoin, this, function (e) {
				if (this.btn_getCoin.click) return;
				this.btn_getCoin.click = !0;
				let i = playerData.getIns().totalIncome;
				utils.createCoinAnim2({
					x: e.stageX,
					y: e.stageY
				}, G.COINPOS, function () {
					t.updateCoin(), t.btn_getCoin.click = !1
				}.bind(this), i > 15 ? 15 : i), playerData.getIns().getIncome()
			}), utils.onBtnScaleEvent(this.btn_getTime, this, function () {
				var e = D.skillConfig[s.getIns().timeSkillLv + 1];
				if (!e || e.id > 10) utils.prompt("Maxed Grade");
				else {
					s.getIns().getCoinMaxed && utils.prompt("The offline time of free gold coins has been capped, and the time will be restarted when receiving free gold coins");
					var i = function () {
						e = D.skillConfig[s.getIns().timeSkillLv + 1];
						var i = utils.getChildDeep(t.btn_getTime, "box_coin"),
							a = utils.getChildDeep(t.btn_getTime, "box_ad");
						utils.getChildDeep(t.btn_getTime, "label_num").text = "Grade" + s.getIns().timeSkillLv, !e || e.id <= 10 ? s.getIns().gold >= e.prive ? (i.visible = !0, a.visible = !1, utils.getChildDeep(i, "label_num").text = e.prive) : (i.visible = !1, a.visible = !0) : (i.visible = !1, a.visible = !1)
					};
					s.getIns().gold >= e.prive ? (s.getIns().addGold(-e.prive), s.getIns().upTimeSkill(), this.updateCoin(), i()) : uleeSDK ? (audioManager.setMusicMuted(!1), uleeSDK.showVideoAD(function () {
						s.getIns().upTimeSkill(), i(), audioManager.huifuMusicMuted()
					}, function () {
						audioManager.huifuMusicMuted()
					})) : (s.getIns().upTimeSkill(), i())
				}
			}), utils.onBtnScaleEvent(this.btn_initNum, this, function () {
				var e = D.skillConfig[s.getIns().initPersonSkillLv + 10 + 1];
				if (e) {
					audioManager.playSound(5, null, !0);
					var i = function () {
						e = D.skillConfig[s.getIns().initPersonSkillLv + 10 + 1];
						var i = utils.getChildDeep(t.btn_initNum, "box_coin"),
							a = utils.getChildDeep(t.btn_initNum, "box_ad"),
							n = utils.getChildDeep(t.btn_initNum, "label_num"),
							o = utils.getChildDeep(t.btn_initNum, "label_tag");
						n.text = "Grade" + s.getIns().initPersonSkillLv, o.visible = !1, e ? s.getIns().gold >= e.prive ? (i.visible = !0, a.visible = !1, utils.getChildDeep(i, "label_num").text = e.prive) : (i.visible = !1, a.visible = !0) : (i.visible = !1, a.visible = !1, o.visible = !0), G.BattleScript.createRole(!0), console.log("添加人数")
					};
					s.getIns().gold >= e.prive ? (s.getIns().addGold(-e.prive), s.getIns().upInitSkill(), this.updateCoin(), i()) : uleeSDK ? (audioManager.setMusicMuted(!1), uleeSDK.showVideoAD(function () {
						s.getIns().upInitSkill(), i(), audioManager.huifuMusicMuted()
					}, function () {
						audioManager.huifuMusicMuted()
					})) : (s.getIns().upInitSkill(), i())
				} else utils.prompt("Maxed Grade")
			}), utils.onBtnScaleEvent(this.btn_dinosaur, this, function () {
				uiManager.openUI("game/DinosaurView.scene"), this.box_scene.visible = !1
			}), utils.onBtnScaleEvent(this.btn_dig, this, function () {
				if (s.getIns().digNum <= 0) return utils.prompt("Insufficient HP"), void uiManager.openUI("game/GetTLView.scene");
				s.getIns().minusDigNum(), uiManager.openUI("game/MiningView.scene"), this.box_scene.visible = !1
			}), utils.onBtnScaleEvent(this.btn_study, this, function () {
				uiManager.openUI("game/StudyView.scene"), this.box_scene.visible = !1
			}), eventDispatcher.addEventListen(ulee.Event.ON_CHANGE_GOLD, this, this.updateCoin)
		}
		onStart(t) {
			if (!this.btn_start.click || G.SceneScript.isLoadComplete) {
				if (G.TLUI && s.getIns().TL < 2) return utils.prompt("Insufficient HP"), void G.TLUI.check();
				this.btn_start.click = !0;
				var e = dataManager.getTryoutSkin();
				window.uleeSDK && "fb" == uleeSDK.pf && uleeSDK.showAD(!1), e && t && G.PULLOUT_TRYOUTUI ? (G.PULLOUT_TRYOUTUI = !1, uiManager.openUI("game/TryoutView.scene", null, {
					id: e,
					callback: function () {
						G.BattleScript.startGame(), this.updateUI(!0), this.btn_start.click = !1, window.uleeSDK && ("fb" == uleeSDK.pf ? uleeSDK.showAD(!0) : "tt" == uleeSDK.pf && uleeSDK.stratGameRecorder()), G.TLUI && (s.getIns().WUXIAN || s.getIns().setTl(s.getIns().TL - 1), G.TLUI.visible = !1)
					}.bind(this)
				})) : (G.BattleScript.startGame(), this.updateUI(!0), this.btn_start.click = !1, window.uleeSDK && ("fb" == uleeSDK.pf ? uleeSDK.showAD(!0) : "tt" == uleeSDK.pf && uleeSDK.stratGameRecorder()), G.TLUI && (s.getIns().WUXIAN || s.getIns().setTl(s.getIns().TL - 1), G.TLUI.visible = !1))
			}
		}
		updateCoin() {
			utils.getChildDeep(this.box_coin, "label_num").text = s.getIns().gold
		}
		updateDig() {
			utils.getChildDeep(this.btn_dig, "label_num").text = s.getIns().digNum + "/" + G.MAXTL
		}
		updateLv() {
			if (s.getIns().tongGuan) this.box_level.visible = !1;
			else {
				for (var t = [], e = s.getIns().level, i = e, a = e, n = e % 5, o = 1; o <= 5; o++) 0 == n ? (t.push(i), i -= 1) : o == n ? t.push(e) : o < n ? (i -= 1, t.push(i)) : (a += 1, t.push(a));
				t.sort(function (t, e) {
					return t - e
				});
				for (o = 0; o < t.length; o++) {
					var r = t[o],
						l = utils.getChildDeep(this.box_level, "img_item" + (o + 1)),
						h = utils.getChildDeep(l, "label_num"),
						d = utils.getChildDeep(l, "img_icon");
					d.visible = r % 3 == 0, l.skin = "common/img_di7_2.png", h.text = r, h.fontSize = 30, l.gray = !1, e == r ? (l.skin = "common/img_di7_3.png", h.fontSize = 40) : e < r ? l.gray = !0 : e > r && (l.skin = "common/img_di7_1.png", h.text = "", d.visible = !1)
				}
			}
		}
		initUpBtns() {
			var t = utils.getChildDeep(this.btn_getTime, "label_num"),
				e = utils.getChildDeep(this.btn_getTime, "box_coin"),
				i = utils.getChildDeep(this.btn_getTime, "box_ad"),
				a = (D.skillConfig[s.getIns().timeSkillLv], D.skillConfig[s.getIns().timeSkillLv + 1]);
			t.text = "Grade" + s.getIns().timeSkillLv, e.visible = !1, i.visible = !1, (!a || a.id <= 10) && (a.prive < s.getIns().gold ? (e.visible = !0, utils.getChildDeep(e, "label_num").text = a.prive) : i.visible = !0);
			var n = utils.getChildDeep(this.btn_initNum, "label_num"),
				o = utils.getChildDeep(this.btn_initNum, "box_coin"),
				r = utils.getChildDeep(this.btn_initNum, "box_ad"),
				l = utils.getChildDeep(this.btn_initNum, "label_tag"),
				h = (D.skillConfig[s.getIns().initPersonSkillLv + 10], D.skillConfig[s.getIns().initPersonSkillLv + 10 + 1]);
			n.text = "Grade" + s.getIns().initPersonSkillLv, o.visible = !1, r.visible = !1, l.visible = !1, h ? h.prive < s.getIns().gold ? (o.visible = !0, utils.getChildDeep(o, "label_num").text = h.prive) : r.visible = !0 : l.visible = !0
		}
		updateGetCoin() {
			s.getIns().totalIncome > 0 ? (utils.getChildDeep(this.btn_getCoin, "label_num").text = s.getIns().totalIncome, this.btn_getCoin.visible = !0) : this.btn_getCoin.visible = !1
		}
		updateUI(t) {
			t ? (this.box_mune.visible = !1, this.img_guide.visible = !0, window.uleeSDK && "wx" == uleeSDK.pf && uleeSDK.hideBox()) : (this.box_mune.visible = !0, this.img_guide.visible = !1, window.uleeSDK && "wx" == uleeSDK.pf && uleeSDK.showBox(Laya.stage.height - 200), G.TLUI ? (G.TLUI.visible = !0, G.TLUI.updateTl()) : uiManager.openUI("game/TlView.scene", this), window.uleeSDK && uleeSDK.showAD(!0)), this.initUpBtns()
		}
	}
	class _ extends Laya.Script3D {
		constructor() {
			super()
		}
		onAwake() {
			this.owner.script = this, this.qkPoint = utils.getChildDeep(this.owner, "qiangkou")
		}
		initData(t) {
			this.config = D.gunConfig[t], this.gunIndex = t, this.shootCD = this.config.shootCD, this.gunId = this.config.modelid, this.damage = this.config.damage, 10001 != this.gunId ? (this.owner.transform.localPositionY = -10, this.owner.transform.localPositionZ = -5) : (this.owner.transform.localPositionY = -4, this.owner.transform.localPositionZ = -3), this.owner.transform.localRotationEulerX = -50, this.owner.transform.localRotationEulerY = 20
		}
		onUpdate() {
			var t = G.FRAME_INTERVAL;
			this.shootCD > 0 && (this.shootCD -= t)
		}
		shoot() {
			audioManager.playSound(6, null, !0), this.timeline || (this.timeline = new Laya.TimeLine, this.timeline.to(this.owner._children[0].transform, {
				localRotationEulerX: -2
			}, 50, null, 0).to(this.owner._children[0].transform, {
				localRotationEulerX: 0
			}, 50, null, 0)), ModelCfg.getIns().getModelById(20002, function (t) {
				this.qkPoint.addChild(t);
				let e = D.gunConfig[this.gunIndex];
				utils.getChildDeep(t, "ef_normal").active = !1, utils.getChildDeep(t, "ef_th").active = !1, utils.getChildDeep(t, "ef_sd").active = !1, utils.getChildDeep(t, "ef_blue").active = !1, utils.getChildDeep(t, "ef_green").active = !1, utils.getChildDeep(t, e.ef).active = !0, 10001 == this.gunId ? this.playAni("shoot", null, !1) : this.timeline.play(0, !1), updateManager.timeOnce(200, this, function () {
					t.destroy()
				})
			}.bind(this)), this.shootCD = this.config.shootCD
		}
		show(t) {
			let e = utils.getTimeLine(Handler.create(this, function () {
				t()
			}));
			10001 == this.gunId ? e.to(this.owner.transform, {
				localRotationEulerX: 0,
				localRotationEulerY: 0,
				localPositionY: -2
			}, 500, Laya.Ease.backOut, 0).play(0, !1) : e.to(this.owner.transform, {
				localRotationEulerX: 0,
				localRotationEulerY: 0,
				localPositionY: this.config.pos[1],
				localPositionZ: this.config.pos[2]
			}, 500, Laya.Ease.backOut, 0).play(0, !1)
		}
		hide() {
			let t = utils.getTimeLine();
			10001 == this.gunId ? t.to(this.owner.transform, {
				localRotationEulerX: -50,
				localRotationEulerY: 20,
				localPositionY: -4
			}, 500, null, 0).play(0, !1) : t.to(this.owner.transform, {
				localRotationEulerX: -50,
				localRotationEulerY: 20,
				localPositionY: -10
			}, 500, null, 0).play(0, !1)
		}
		playAni(t, e, i, s, a) {
			let n = this.owner.getChildAt(0).getComponent(Laya.Animator);
			if (n) {
				a ? n.crossFade(t, a, 0, 0) : n.play(t, 0, 0);
				var o = n._controllerLayers[0]._statesMap[t];
				o.script || (o.addScript(l), o.script = o._scripts[0], o.script.loop = i || o._clip.islooping, o.script.animator = n, o.script.animName = t), s || (s = 1), o.speed = s, o.script.setComplete(e), this.curAnim = n.curAnim = t
			} else console.error(this.owner, "动作控制器未加载！")
		}
		stopAnim(t) {
			let e = this.owner.getChildAt(0).getComponent(Laya.Animator);
			e && (t || (t = this.owner.curAnim), t && (e._controllerLayers[0]._statesMap[t].speed = 0))
		}
	}
	class b extends Laya.Script3D {
		constructor() {
			super()
		}
		onAwake() {
			this.initData(), this.owner.script = this, this.box = this.owner.addChild(new Laya.MeshSprite3D(Laya.PrimitiveMesh.createBox(1, 1, 1))), this.box.meshRenderer.material = G.BattleScript.nullMat, this.isAirborne || (this.Parachute = utils.getChildDeep(this.owner, "Parachute"), this.Parachute.active = !1)
		}
		initData() {
			this.moveSpeed = 8, this.pathIndex = 1, this.moveVec = new Vector3(0, 0, 0), this.targetPos = new Vector3(0, 0, 0), this.tempVec3 = new Vector3(0, 0, 0), this.temp2Vec3 = new Vector3(0, 0, 0), this.temp3Vec3 = new Vector3(0, 0, 0), this.fallSpeed = 5, this.targetR = null, this.out = new Laya.Vector4
		}
		airborne() {
			d.getIns().setLocalPosition(this.owner, 0, 100, 0), this.playAni("Fall", null, !0), this.isAirborne = !0, this.Parachute.active = !0, this.tempValue = 0
		}
		startRun() {
			this.isAirborne = !1, this.owner.active = !0, this.Parachute.active = !1, d.getIns().setLocalPosition(this.owner, 0, 0, 0), Laya.timer.once(utils.random(50, 500), this, function () {
				this.playAni("Running", null, !0)
			})
		}
		setHelp(t, e, i) {
			this.isNeedHelp = !0, this.playAni("Terrified", null, !0, 1, .2), d.getIns().setLocalPosition(this.owner, t, e, i), this.owner.transform.localRotationEulerY = utils.random(0, 360)
		}
		resume(t, e) {
			this.searchBelo = e, G.BattleScript.resumeRole(this.owner), this.pathIndex = t, this.isNeedHelp = !1, this.playAni("Running", null, !0), this.setTargetPos(!0), this.helpPZ && (this.helpPZ.destroy(), this.helpPZ = null)
		}
		tumble() {
			this.isTumble || (this.isTumble = !0, this.playAni("Death", function () {
				this.playAni("StandUp", function () {
					this.isTumble = !1, this.isWait ? this.playAni("Terrified", null, !0, 1, .2) : this.playAni("Running", null, !0)
				}.bind(this), !1, 1.5, .1)
			}.bind(this), !1, 1.5, .1))
		}
		onStart() {
			if (!this.isNeedHelp) {
				let t = G.BattleScript.getPath(this.pathIndex).transform.position;
				this.owner.transform.lookAt(t, cameraUtils.upPos), this.curR = this.owner.transform.localRotationEulerY, this.targetPos.x = t.x, this.targetPos.y = t.y, this.targetPos.z = t.z
			}
		}
		setTargetPos(t) {
			let e = G.BattleScript.getPath(this.pathIndex);
			if (e) {
				let i = e.name.split("_");
				e = e.transform.position, "jump" == i[1] ? this.isNeedJump = !0 : "end" == i[1] && (this.isArriveEnd = !0), this.targetPos.x = e.x + utils.random(-3, 3), this.targetPos.y = e.y, this.targetPos.z = e.z + utils.random(-3, 3), t && (this.box.transform.lookAt(this.targetPos, cameraUtils.upPos), this.curR = this.box.transform.rotationEuler.y)
			}
		}
		isArriveTarget() {
			let t = this.owner.transform.position;
			if (tools.getTwoPointDist(t.x, t.z, this.targetPos.x, this.targetPos.z) < 2) return this.targetHelp ? (this.targetHelp.script.resume(this.pathIndex, this.searchBelo), this.targetHelp = null, this.setTargetPos(!0)) : this.isNeedJump ? (this.owner.transform.localPositionX = this.targetPos.x, this.owner.transform.localPositionZ = this.targetPos.z, cameraUtils.setTarget(null, null), G.BattleScript.endCamera2(), this.isSafe = !0, this.playAni("JumpInHelicopter", function () {
				this.jumpComplete || (this.jumpComplete = !0, G.BattleScript.safeRole(this.owner), this.playAni("VictoryDance"))
			}.bind(this), !1), Laya.timer.once(1e3, this, function () {
				this.jumpComplete || (this.jumpComplete = !0, G.BattleScript.safeRole(this.owner), this.playAni("VictoryDance"))
			})) : (this.isArriveEnd && G.BattleScript.endCamera1(), this.pathIndex++, this.setTargetPos()), !0; {
				this.box.transform.lookAt(this.targetPos, cameraUtils.upPos);
				let t = this.box.transform.rotationEuler.y % 360,
					e = this.curR % 360;
				return (e = e < 0 ? e + 360 : e) < (t = t < 0 ? t + 360 : t) ? e + 180 > t ? this.speedR = 100 : e + 180 <= t && (this.speedR = -100) : e > t && (e - 180 > t ? this.speedR = 100 : e - 180 <= t && (this.speedR = -100)), Math.abs(this.curR - t) > 1 && (this.targetR = t), !1
			}
		}
		searchHelp() {
			if (this.isSafe || this.isNeedHelp || this.isTumble) return;
			let t = this.owner.transform.position;
			if (this.targetHelp) this.targetHelp.script.isNeedHelp && !this.targetHelp.script.isDeath || (this.targetHelp = null, this.setTargetPos(!0));
			else {
				let e = G.BattleScript.getHelpRole(this.searchBelo, t.x, t.z);
				if (e) {
					this.targetHelp = e;
					let t = this.targetHelp.transform.position;
					this.owner.transform.lookAt(t, cameraUtils.upPos), this.curR = this.owner.transform.localRotationEulerY, this.targetR = null, this.targetPos.x = t.x, this.targetPos.z = t.z
				}
			}
		}
		setWait() {
			this.isWait || (this.isWait = !0, "Terrified" != this.curAnim && this.isWait && !this.isDeath && this.playAni("Terrified", null, !0, 1, .2))
		}
		releaseWait() {
			this.isWait = !1, this.isTumble || this.playAni("Running", null, !0)
		}
		move(t) {
			if (this.isSafe || this.isNeedHelp || this.isWait || this.isTumble || this.isAirborne) return;
			if (this.curR != this.bkR && (d.getIns().setLocalRotation(this.owner, 0, this.curR, 0), this.moveVec.x = -Math.sin(this.curR * Math.RAD_1_ANGLE) * this.moveSpeed, this.moveVec.z = -Math.cos(this.curR * Math.RAD_1_ANGLE) * this.moveSpeed, this.bkR = this.curR), null != this.targetR) {
				if (this.curR > this.targetR) var e = !0;
				else e = !1;
				this.curR += this.speedR * t;
				let i = !1;
				this.curR >= 360 ? (this.curR = this.curR - 360, i = !0) : this.curR < 0 && (this.curR = this.curR + 360, i = !0), this.curR > this.targetR ? (i && e || !i && !e) && (this.curR = this.targetR, this.targetR = null) : this.curR < this.targetR ? (i && !e || !i && e) && (this.curR = this.targetR, this.targetR = null) : (this.curR = this.targetR, this.targetR = null)
			}
			let i = this.owner.transform.position;
			this.temp2Vec3.x = i.x, this.temp2Vec3.y = i.y + 4, this.temp2Vec3.z = i.z, this.temp3Vec3.x = i.x, this.temp3Vec3.y = -1, this.temp3Vec3.z = i.z;
			let s = G.BattleScript.rayCast(this.temp2Vec3, this.temp3Vec3, Laya.Physics3DUtils.COLLISIONFILTERGROUP_CUSTOMFILTER1);
			s.succeeded ? (this.startFall = !1, this.owner.transform.localPositionX += this.moveVec.x * t, this.owner.transform.localPositionZ += this.moveVec.z * t, G.BattleScript.recycleHitRes(s), this.isArriveTarget(), this.searchBelo && this.searchHelp(), this.checkTri()) : ("ZombieJump" != this.curAnim && this.playAni("ZombieJump", function () {
				this.startFall = !0
			}.bind(this), !1, 1.5, .2), this.startFall ? (this.owner.transform.localPositionY -= this.fallSpeed * t, this.fallSpeed++) : (this.owner.transform.localPositionX += this.moveVec.x * t * .5, this.owner.transform.localPositionZ += this.moveVec.z * t * .5))
		}
		checkTri() {
			let t = this.owner.transform.position;
			this.temp2Vec3.x = t.x, this.temp2Vec3.y = t.y + 4, this.temp2Vec3.z = t.z, this.temp3Vec3.x = t.x, this.temp3Vec3.y = -1, this.temp3Vec3.z = t.z;
			let e = G.BattleScript.rayCast(this.temp2Vec3, this.temp3Vec3, Laya.Physics3DUtils.COLLISIONFILTERGROUP_CUSTOMFILTER2);
			e.succeeded && (e.collider.owner.name.indexOf("human") > -1 ? this.searchBelo = e.collider.owner.name : e.collider.owner.name.indexOf("wait") > -1 ? e.collider.owner.parent.script.isRelease || G.BattleScript.setWaitQueue(this) : e.collider.owner.isGunTong ? this.tumble() : e.collider.owner.name.indexOf("tri_") > -1 ? G.BattleScript.addCreateDino(e.collider.owner) : e.collider.owner.name.indexOf("tri2_") > -1 ? G.BattleScript.awakenDino(e.collider.owner) : e.collider.owner.name.indexOf("CamP") > -1 && (G.BattleScript.switchCamP(e.collider.owner.parent), e.collider.owner.destroy())), G.BattleScript.recycleHitRes(e)
		}
		checkRole(t) {
			if (t.script.isSafe || this.isSafe) return;
			let e = this.owner.transform.position,
				i = t.transform.position;
			if (Math.abs(e.x - i.x) < 3 && Math.abs(e.z - i.z) < 3) {
				this.tempVec3.x = e.x - i.x, this.tempVec3.y = e.y - i.y, this.tempVec3.z = e.z - i.z, Laya.Vector3.normalize(this.tempVec3, this.tempVec3), this.temp2Vec3.x = e.x + .05 * this.tempVec3.x, this.temp2Vec3.y = e.y + 1, this.temp2Vec3.z = e.z + .05 * this.tempVec3.z, this.temp3Vec3.x = e.x + .05 * this.tempVec3.x, this.temp3Vec3.y = -1, this.temp3Vec3.z = e.z + .05 * this.tempVec3.z;
				let s = G.BattleScript.rayCast(this.temp2Vec3, this.temp3Vec3, Laya.Physics3DUtils.COLLISIONFILTERGROUP_CUSTOMFILTER1);
				s.succeeded && (this.owner.transform.localPositionX = this.temp2Vec3.x, this.owner.transform.localPositionZ = this.temp2Vec3.z), G.BattleScript.recycleHitRes(s), this.temp2Vec3.x = i.x - .05 * this.tempVec3.x, this.temp2Vec3.y = i.y + 1, this.temp2Vec3.z = i.z - .05 * this.tempVec3.z, this.temp3Vec3.x = i.x - .05 * this.tempVec3.x, this.temp3Vec3.y = -1, this.temp3Vec3.z = i.z - .05 * this.tempVec3.z;
				let a = G.BattleScript.rayCast(this.temp2Vec3, this.temp3Vec3, Laya.Physics3DUtils.COLLISIONFILTERGROUP_CUSTOMFILTER1);
				a.succeeded && (t.transform.localPositionX = this.temp2Vec3.x, t.transform.localPositionZ = this.temp2Vec3.z), G.BattleScript.recycleHitRes(a)
			}
		}
		death() {
			this.isSafe || G.BattleScript.isSwitchCameraEnd || (this.isDeath = !0, this.targetHelp && (this.targetHelp.waitResume = !1), this.playAni("Death", function () {
				G.BattleScript.firstRole ? Laya.timer.callLater(this, function () {
					this.owner.destroy()
				}) : G.BattleScript.endGame(!1)
			}.bind(this), !1))
		}
		createHelpPZ() {
			d.getIns().getModelById(50002, function (t) {
				this.owner.addChild(t), d.getIns().setLocalPosition(t, 0, utils.random(4, 8), 0), this.helpPZ = t, this.playAni("help", null, !0, 1, 0, t._children[0])
			}.bind(this))
		}
		setActive(t) {
			this.owner._children[0].active != t && (this.owner._children[0].active = t)
		}
		onUpdate() {
			let t = G.FRAME_INTERVAL;
			if (G.ISIOS && (G.BattleScript.camera.worldToViewportPoint(this.owner.transform.position, this.out), this.out.w > 0 && this.out.x >= 0 && this.out.x <= Laya.stage.width && this.out.y >= 0 && this.out.y <= Laya.stage.height ? this.setActive(!0) : this.setActive(!1)), this.isAirborne && (this.owner.transform.localPositionY -= 10 * t, this.tempValue += 1.5, this.owner.transform.localPositionX = 5 * Math.sin(this.tempValue * Math.RAD_1_ANGLE), d.getIns().setLocalRotation(this.owner, 0, 0, 0), this.owner.transform.localPositionY < 30 && (this.isAirborne = !1, this.Parachute.active = !1)), !this.isDeath && G.BattleScript.gameState != G.GAME_STEP.IDLE) return this.owner.transform.position.y < -15 ? (this.isDeath = !0, this.targetHelp && (this.targetHelp.waitResume = !1), void Laya.timer.callLater(this, function () {
				this.owner.destroy(), G.BattleScript.firstRole || G.BattleScript.endGame(!1)
			})) : (this.move(t), void (this.helpPZ && this.helpPZ.transform.lookAt(G.BattleScript.camera.transform.position, cameraUtils.upPos)))
		}
		onDestroy() {
			this.owner.destroy()
		}
		playAni(t, e, i, s, a, n) {
			if (n) n = n.getChildAt(0);
			else var n = this.owner.getChildAt(0);
			let o = n.getComponent(Laya.Animator);
			if (o) {
				a ? o.crossFade(t, a, 0, 0) : o.play(t, 0, 0);
				var r = o._controllerLayers[0]._statesMap[t];
				r.script || (r.addScript(l), r.script = r._scripts[0], r.script.loop = i || r._clip.islooping, r.script.animator = o, r.script.animName = t), s || (s = 1), r.speed = s, r.script.setComplete(e), this.curAnim = o.curAnim = t
			} else console.error(this.owner, "动作控制器未加载！")
		}
		stopAnim(t) {
			let e = this.owner.getChildAt(0).getComponent(Laya.Animator);
			e && (t || (t = this.owner.curAnim), t && (e._controllerLayers[0]._statesMap[t].speed = 0))
		}
	}
	class S extends Laya.Script3D {
		constructor() {
			super()
		}
		onStart() {
			let t = G.BattleScript.getPath(this.pathIndex).transform.position;
			this.owner.transform.lookAt(t, cameraUtils.upPos), this.curR = this.owner.transform.localRotationEulerY, this.owner.transform.localRotationEulerY = this.curR + 180, this.targetPos.x = t.x + utils.random(-4, 4), this.targetPos.y = t.y, this.targetPos.z = t.z + utils.random(-4, 4), this.out = new Laya.Vector4
		}
		setInfo(t) {
			let e = D.dinoConfig[t];
			this.modelId = t, G.ISIOS ? this.hp = this.maxhp = this.hpbk = e.hp * (1 + .05 * playerData.getIns().level) * 2 : this.hp = this.maxhp = this.hpbk = e.hp * (1 + .05 * playerData.getIns().level), this.money = e.gold
		}
		setTargetPos(t) {
			let e = G.BattleScript.getPath(this.pathIndex);
			if (e) {
				"jump" == e.name.split("_")[1] && (this.targetEnd = !0), e = e.transform.position, this.targetPos.x = e.x + utils.random(-4, 4), this.targetPos.y = e.y, this.targetPos.z = e.z + utils.random(-4, 4), t && (this.owner.transform.lookAt(e, cameraUtils.upPos), this.curR = this.owner.transform.localRotationEulerY, this.owner.transform.localRotationEulerY = this.curR + 180)
			}
		}
		isArriveTarget() {
			let t = this.owner.transform.position;
			if (tools.getTwoPointDist(t.x, t.z, this.targetPos.x, this.targetPos.z) < 3) return this.targetEnd ? (this.state = G.DINO_STEP.STAND, this.roar()) : (this.pathIndex++, this.setTargetPos()), !0;
			if (!this.attackTarget) {
				this.box.transform.lookAt(this.targetPos, cameraUtils.upPos);
				let t = this.box.transform.rotationEuler.y % 360,
					e = this.curR % 360;
				(e = e < 0 ? e + 360 : e) < (t = t < 0 ? t + 360 : t) ? e + 180 > t ? this.speedR = 100 : e + 180 <= t && (this.speedR = -100) : e > t && (e - 180 > t ? this.speedR = 100 : e - 180 <= t && (this.speedR = -100)), Math.abs(this.curR - t) > 1 && (this.targetR = t)
			}
			return !1
		}
		doAttack() {
			this.state = G.DINO_STEP.ATTACK, this.playAni("Attack", function () {
				G.BattleScript.isFail ? (this.state = G.DINO_STEP.STAND, this.roar()) : (this.state = G.DINO_STEP.RUN, this.playAni("Move", null, !0, 1.1)), this.setTargetPos(!0)
			}.bind(this), !0, 1.3)
		}
		beHit() {
			this.state = G.DINO_STEP.STAND, this.playAni("Hurt", function () {
				this.dizy(), this.playAni("Idel", null, !0)
			}.bind(this), !1, .9)
		}
		behit(t, e) {
			if (this.state != G.DINO_STEP.DEATH && this.state != G.DINO_STEP.STAND && !this.isSleep && !this.dizyCD) {
				if (this.hitef) {
					let e = this.hitef.clone();
					this.owner.addChild(e), e.transform.position = t, e.active = !0, Laya.timer.once(1e3, this, function () {
						e.destroy()
					})
				}
				this.state != G.DINO_STEP.READY && (this.hp -= e, this.hp <= 0 && (this.hp = 0, 0 == this.dizyCD ? this.beHit() : this.death()), this.blood && (this.blood.visible = !0, this.blood.showCD = 1, this.blood.panelBlood.width = 155 * this.hp / this.maxhp))
			}
		}
		setBlood(t) {
			this.blood = t, this.position = new Laya.Vector3, this.outPos = new Laya.Vector3
		}
		death() {
			this.state != G.DINO_STEP.DEATH && (this.state = G.DINO_STEP.DEATH, this.playAni("FallDown", function () {
				let t = this.dieef.clone();
				this.owner.parent.addChild(t), t.transform.position = this.owner.transform.position, t.active = !0, this.owner.active = !1, Laya.timer.once(1e3, this, function () {
					this.owner.destroy(), t.destroy()
				}), this.blood && this.blood.destroy(), G.BattleScript.addGold(this.money, t.transform.position)
			}.bind(this), !1))
		}
		roar() {
			this.playAni("Roar", function () {
				this.roar()
			}.bind(this))
		}
		move(t) {
			this.state == G.DINO_STEP.DEATH || this.state == G.DINO_STEP.STAND || this.state == G.DINO_STEP.ATTACK || G.BattleScript.isFail || (this.curR != this.bkR && (d.getIns().setLocalRotation(this.owner, 0, this.curR + 180, 0), this.moveVec.x = -Math.sin(this.curR * Math.RAD_1_ANGLE) * this.moveSpeed, this.moveVec.z = -Math.cos(this.curR * Math.RAD_1_ANGLE) * this.moveSpeed, this.bkR = this.curR), this.targetR ? (this.curR = this.targetR, this.targetR = null) : (this.owner.transform.localPositionX += this.moveVec.x * t, this.owner.transform.localPositionZ += this.moveVec.z * t), this.checkAtk(), this.checkTri(), this.isArriveTarget(), this.checkLand(t))
		}
		checkLand(t) {
			let e = this.owner.transform.position;
			this.temp2Vec3.x = e.x, this.temp2Vec3.y = e.y + 2, this.temp2Vec3.z = e.z, this.temp3Vec3.x = e.x, this.temp3Vec3.y = -1, this.temp3Vec3.z = e.z;
			let i = G.BattleScript.rayCast(this.temp2Vec3, this.temp3Vec3, Laya.Physics3DUtils.COLLISIONFILTERGROUP_CUSTOMFILTER1);
			i.succeeded || (this.owner.transform.localPositionY -= this.fallSpeed * t, this.fallSpeed++), G.BattleScript.recycleHitRes(i)
		}
		checkRepeat(t) {
			let e = this.owner.transform.position,
				i = t.transform.position;
			if (Math.abs(e.x - i.x) < this.size + t.script.size && Math.abs(e.z - i.z) < this.size + t.script.size)
				if (t.script.size > this.size) {
					this.tempVec3.x = e.x - i.x, this.tempVec3.y = e.y - i.y, this.tempVec3.z = e.z - i.z, Laya.Vector3.normalize(this.tempVec3, this.tempVec3), this.temp2Vec3.x = e.x + .05 * this.tempVec3.x, this.temp2Vec3.y = e.y + 1, this.temp2Vec3.z = e.z + .05 * this.tempVec3.z, this.temp3Vec3.x = e.x + .05 * this.tempVec3.x, this.temp3Vec3.y = -1, this.temp3Vec3.z = e.z + .05 * this.tempVec3.z;
					let t = G.BattleScript.rayCast(this.temp2Vec3, this.temp3Vec3, Laya.Physics3DUtils.COLLISIONFILTERGROUP_CUSTOMFILTER1);
					t.succeeded && (this.owner.transform.localPositionX = this.temp2Vec3.x, this.owner.transform.localPositionZ = this.temp2Vec3.z), G.BattleScript.recycleHitRes(t)
				} else {
					this.temp2Vec3.x = i.x - .05 * this.tempVec3.x, this.temp2Vec3.y = i.y + 1, this.temp2Vec3.z = i.z - .05 * this.tempVec3.z, this.temp3Vec3.x = i.x - .05 * this.tempVec3.x, this.temp3Vec3.y = -1, this.temp3Vec3.z = i.z - .05 * this.tempVec3.z;
					let e = G.BattleScript.rayCast(this.temp2Vec3, this.temp3Vec3, Laya.Physics3DUtils.COLLISIONFILTERGROUP_CUSTOMFILTER1);
					e.succeeded && (t.transform.localPositionX = this.temp2Vec3.x, t.transform.localPositionZ = this.temp2Vec3.z), G.BattleScript.recycleHitRes(e)
				}
		}
		checkTri() {
			let t = this.owner.transform.position;
			this.temp2Vec3.x = t.x, this.temp2Vec3.y = t.y + 4, this.temp2Vec3.z = t.z, this.temp3Vec3.x = t.x, this.temp3Vec3.y = -1, this.temp3Vec3.z = t.z;
			let e = G.BattleScript.rayCast(this.temp2Vec3, this.temp3Vec3, Laya.Physics3DUtils.COLLISIONFILTERGROUP_CUSTOMFILTER2);
			e.succeeded && (e.collider.owner.name.indexOf("human") > -1 ? this.searchBelo = e.collider.owner.name : e.collider.owner.isGunTong && this.obsDamage(3)), G.BattleScript.recycleHitRes(e)
		}
		awaken() {
			this.isSleep && (this.isSleep = !1, this.state = G.DINO_STEP.STAND, this.playAni("StandUp", function () {
				this.state = G.DINO_STEP.RUN, this.playAni("Move", null, !0, 1.3), this.setTargetPos(!0), console.log("叫醒恐龙")
			}.bind(this), !1))
		}
		setSleep() {
			this.isSleep = !0, this.playAni("FallDown", null, !1)
		}
		onUpdate() {
			if (G.ISIOS && (G.BattleScript.camera.worldToViewportPoint(this.owner.transform.position, this.out), this.out.w > 0 && this.out.x >= 0 && this.out.x <= Laya.stage.width && this.out.y >= 0 && this.out.y <= Laya.stage.height ? this.setActive(!0) : this.setActive(!1)), this.isSleep) return;
			if (G.BattleScript.isFail) return this.state != G.DINO_STEP.ATTACK && "Idel" != this.curAnim && this.playAni("Idel", null, !0), void (this.blood && (this.blood.visible = !1));
			let t = G.FRAME_INTERVAL;
			this.dizyCD && (this.dizyCD -= t, this.dizyCD <= 0 && (this.dizyCD = 0, this.hp = this.maxhp, this.blood.panel2.width = 155, this.dizyef.active = !1, this.playAni("Roar", function () {
				this.state = G.DINO_STEP.RUN, this.playAni("Move", null, !0, 1.3), this.moveSpeed *= 1.1
			}.bind(this))));
			let e = this.owner.transform.position;
			if (e.y < -15) return this.blood && (this.blood.visible = !1), void Laya.timer.callLater(this, function () {
				this.owner.destroy()
			});
			if (this.state == G.DINO_STEP.RUN) {
				if (this.searchEnemyCD -= t, this.searchEnemyCD <= 0) {
					this.searchEnemyCD = .7;
					let t = G.BattleScript.getCloseRole(this.searchBelo, e.x, e.z);
					t ? this.attackTarget && (this.attackTarget != t || this.attackTarget.script.isDeath) ? (this.targetR = null, this.attackTarget = null, this.setTargetPos(!0)) : (this.attackTarget = t, this.owner.transform.lookAt(t.transform.position, cameraUtils.upPos), this.curR = this.owner.transform.localRotationEulerY, this.owner.transform.localRotationEulerY = this.curR + 180) : this.attackTarget && this.attackTarget.script.isDeath && (this.targetR = null, this.attackTarget = null, this.setTargetPos(!0))
				}
				this.move(t)
			}
			this.blood && this.blood.visible && (this.blood.showCD -= t, this.dizyCD > 0 ? (this.blood.panelBlood.width = 155 * (1 - this.dizyCD), this.blood.visible = !0) : this.blood.showCD < 0 && (this.blood.visible = !1), this.position.x = e.x, this.position.y = e.y + 12, this.position.z = e.z, G.BattleScript.camera.viewport.project(this.position, G.BattleScript.camera.projectionViewMatrix, this.outPos), this.outPos.w > 0 ? this.blood.pos(this.outPos.x / Laya.stage.clientScaleX - this.blood.width / 2, this.outPos.y / Laya.stage.clientScaleY - this.blood.height / 2) : this.blood.visible = !1, this.hp < this.hpbk && (this.hpbk -= 5, this.hpbk = this.hpbk < 0 ? 0 : this.hpbk), this.blood.panel2.width = 155 * this.hpbk / this.maxhp)
		}
		onDestroy() {
			this.owner.destroy()
		}
		playAni(t, e, i, s, a) {
			let n = this.owner.getChildAt(0)._hierarchyAnimator;
			if (n) {
				a ? n.crossFade(t, a, 0, 0) : n.play(t, 0, 0);
				var o = n._controllerLayers[0]._statesMap[t];
				o.script || (o.addScript(l), o.script = o._scripts[0], o.script.loop = i || o._clip.islooping, o.script.animator = n, o.script.animName = t), s || (s = 1), o.speed = s, o.script.setComplete(e), this.curAnim = n.curAnim = t
			} else console.error(this.owner, "动作控制器未加载！")
		}
		stopAnim(t) {
			let e = this.owner.getChildAt(0).getComponent(Laya.Animator);
			e && (t || (t = this.owner.curAnim), t && (e._controllerLayers[0]._statesMap[t].speed = 0))
		}
	}
	class v extends S {
		constructor() {
			super(), this.initData()
		}
		onAwake() {
			this.owner.script = this, this.isDino = !0, this.state = G.DINO_STEP.RUN, this.playAni("Move", null, !0, 1.3), d.getIns().setLocalScale(this.owner, 1.5, 1.5, 1.5), utils.getChildDeep(this.owner, "mod_run_shadow").getComponent(Laya.PhysicsCollider).destroy(), this.box = this.owner.addChild(new Laya.MeshSprite3D(Laya.PrimitiveMesh.createBox(1, 1, 1))), this.box.meshRenderer.material = G.BattleScript.nullMat, this.dieef = utils.getChildDeep(this.owner, "ef_jjdzkl_dieSmoke"), d.getIns().getModelById(20003, function (t) {
				this.hitef = t
			}.bind(this)), G.BattleScript.addMonsterBlood(this.owner), utils.getChildDeep(this.owner, "mod_horn_01") && d.getIns().resetOutLine(utils.getChildDeep(this.owner, "mod_horn_01")), utils.getChildDeep(this.owner, "mod_horn_02") && d.getIns().resetOutLine(utils.getChildDeep(this.owner, "mod_horn_02")), d.getIns().resetOutLine(utils.getChildDeep(this.owner, "mod_run_body")), d.getIns().resetOutLine(utils.getChildDeep(this.owner, "mod_run_head"))
		}
		initData() {
			this.moveSpeed = 11, this.pathIndex = 1, this.moveVec = new Vector3(0, 0, 0), this.targetPos = new Vector3(0, 0, 0), this.tempVec3 = new Vector3(0, 0, 0), this.temp2Vec3 = new Vector3(0, 0, 0), this.temp3Vec3 = new Vector3(0, 0, 0), this.state = G.DINO_STEP.READY, this.searchEnemyCD = .5, this.fallSpeed = 10, this.size = 6, this.noRepeat = !0, this.dizyCD = 0
		}
		checkAtk() {
			let t = this.owner.transform.position,
				e = G.BattleScript.getCloseRole(this.searchBelo, t.x, t.z);
			if (e) {
				let i = e.transform.position;
				Math.abs(i.x - t.x) < 7 && Math.abs(i.z - t.z) < 7 && (this.owner.transform.lookAt(e.transform.position, cameraUtils.upPos), this.curR = this.owner.transform.localRotationEulerY, this.owner.transform.localRotationEulerY = this.curR + 180, this.doAttack(), e.script.death())
			}
		}
		obsDamage(t) {
			if (this.state != G.DINO_STEP.READY) {
				let e = D.obsConfig[t];
				this.hp -= e.dmg2 * this.maxhp, this.hp <= 0 && (this.hp = 0, this.beHit()), this.blood && (this.blood.visible = !0, this.blood.showCD = 1, this.blood.panelBlood.width = 155 * this.hp / this.maxhp)
			}
		}
		dizy() {
			this.dizyef ? this.dizyef.active = !0 : d.getIns().getModelById(20010, function (t) {
				this.owner.addChild(t), this.dizyef = t, d.getIns().setLocalPosition(t, 0, 12, 0), d.getIns().setLocalScale(t, 7)
			}.bind(this)), this.dizyCD = 1
		}
		setActive(t) {
			this.owner._children[1].active != t && (30002 != this.modelId && 30003 != this.modelId || (this.owner._children[3].active = t, this.owner._children[4].active = t), this.owner._children[1].active = t, this.owner._children[2].active = t)
		}
	}
	class w extends S {
		constructor() {
			super(), this.initData()
		}
		onAwake() {
			this.owner.script = this, this.isDino = !0, this.state = G.DINO_STEP.RUN, this.playAni("Move", null, !0, 1.3), d.getIns().setLocalScale(this.owner, 1.5, 1.5, 1.5), utils.getChildDeep(this.owner, "mod_triceratops_shadow").getComponent(Laya.PhysicsCollider).destroy(), this.box = this.owner.addChild(new Laya.MeshSprite3D(Laya.PrimitiveMesh.createBox(1, 1, 1))), this.box.meshRenderer.material = G.BattleScript.nullMat, this.dieef = utils.getChildDeep(this.owner, "ef_jjdzkl_dieSmoke"), d.getIns().getModelById(20003, function (t) {
				this.hitef = t
			}.bind(this)), G.BattleScript.addMonsterBlood(this.owner), d.getIns().resetOutLine(utils.getChildDeep(this.owner, "mod_role_land_01")), d.getIns().resetOutLine(utils.getChildDeep(this.owner, "mod_role_land_02"))
		}
		initData() {
			this.moveSpeed = 10, this.pathIndex = 1, this.moveVec = new Vector3(0, 0, 0), this.targetPos = new Vector3(0, 0, 0), this.tempVec3 = new Vector3(0, 0, 0), this.temp2Vec3 = new Vector3(0, 0, 0), this.temp3Vec3 = new Vector3(0, 0, 0), this.state = G.DINO_STEP.READY, this.searchEnemyCD = .7, this.fallSpeed = 10, this.size = 6, this.noRepeat = !0, this.dizyCD = 0
		}
		checkAtk() {
			let t = this.owner.transform.position,
				e = G.BattleScript.getCloseRole(this.searchBelo, t.x, t.z);
			if (e) {
				let i = e.transform.position;
				Math.abs(i.x - t.x) < 7 && Math.abs(i.z - t.z) < 7 && (this.owner.transform.lookAt(e.transform.position, cameraUtils.upPos), this.curR = this.owner.transform.localRotationEulerY, this.owner.transform.localRotationEulerY = this.curR + 180, this.doAttack(), e.script.death())
			}
		}
		obsDamage(t) {
			if (this.state != G.DINO_STEP.READY) {
				let e = D.obsConfig[t];
				this.hp -= e.dmg2 * this.maxhp, this.hp <= 0 && (this.hp = 0, this.beHit()), this.blood && (this.blood.visible = !0, this.blood.showCD = 1, this.blood.panelBlood.width = 155 * this.hp / this.maxhp)
			}
		}
		dizy() {
			this.dizyef ? this.dizyef.active = !0 : d.getIns().getModelById(20010, function (t) {
				this.owner.addChild(t), this.dizyef = t, d.getIns().setLocalPosition(t, 0, 8, 0), d.getIns().setLocalScale(t, 7)
			}.bind(this)), this.dizyCD = 1
		}
		setActive(t) {
			this.owner._children[1].active != t && (this.owner._children[1].active = t, this.owner._children[2].active = t)
		}
	}
	class L extends S {
		constructor() {
			super()
		}
		onAwake() {
			this.initData(), this.owner.script = this, this.isDino = !0, this.state = G.DINO_STEP.RUN, this.playAni("Move", null, !0, 1.3), d.getIns().setLocalScale(this.owner, 1.5), utils.getChildDeep(this.owner, "mod_velociraptor_shadow").getComponent(Laya.PhysicsCollider).destroy(), this.box = this.owner.addChild(new Laya.MeshSprite3D(Laya.PrimitiveMesh.createBox(1, 1, 1))), this.box.meshRenderer.material = G.BattleScript.nullMat, this.dieef = utils.getChildDeep(this.owner, "ef_jjdzkl_dieSmoke"), d.getIns().getModelById(20003, function (t) {
				this.hitef = t
			}.bind(this)), d.getIns().resetOutLine(utils.getChildDeep(this.owner, "mod_velociraptor")), d.getIns().resetOutLine(utils.getChildDeep(this.owner, "mod_velociraptor_01"))
		}
		initData() {
			this.moveSpeed = 12, this.pathIndex = 0, this.moveVec = new Vector3(0, 0, 0), this.targetPos = new Vector3(0, 0, 0), this.tempVec3 = new Vector3(0, 0, 0), this.temp2Vec3 = new Vector3(0, 0, 0), this.temp3Vec3 = new Vector3(0, 0, 0), this.state = G.DINO_STEP.READY, this.searchEnemyCD = .3, this.fallSpeed = 10, this.size = 6, this.noRepeat = !0
		}
		checkAtk() {
			let t = this.owner.transform.position,
				e = G.BattleScript.getCloseRole(this.searchBelo, t.x, t.z);
			if (e) {
				let i = e.transform.position;
				Math.abs(i.x - t.x) < 3 && Math.abs(i.z - t.z) < 3 && (this.owner.transform.lookAt(e.transform.position, cameraUtils.upPos), this.curR = this.owner.transform.localRotationEulerY, this.owner.transform.localRotationEulerY = this.curR + 180, this.doAttack(), e.script.death())
			}
		}
		obsDamage(t) {
			if (this.state != G.DINO_STEP.READY) {
				let e = D.obsConfig[t];
				this.hp -= e.dmg1 * this.maxhp, this.hp <= 0 && (this.hp = 0, this.death()), this.blood && (this.blood.visible = !0, this.blood.showCD = 1, this.blood.panelBlood.width = 155 * this.hp / this.maxhp)
			}
		}
		setActive(t) {
			this.owner._children[1].active != t && (this.owner._children[1].active = t, this.owner._children[2].active = t)
		}
	}
	class C extends S {
		constructor() {
			super(), this.initData()
		}
		onAwake() {
			this.owner.script = this, this.isDino = !0, this.state = G.DINO_STEP.RUN, this.playAni("Move", null, !0, 1.3), d.getIns().setLocalScale(this.owner, 1.5, 1.5, 1.5), this.box = this.owner.addChild(new Laya.MeshSprite3D(Laya.PrimitiveMesh.createBox(1, 1, 1))), this.box.meshRenderer.material = G.BattleScript.nullMat, this.dieef = utils.getChildDeep(this.owner, "ef_jjdzkl_dieSmoke"), d.getIns().getModelById(20003, function (t) {
				this.hitef = t
			}.bind(this)), G.BattleScript.addMonsterBlood(this.owner), d.getIns().resetOutLine(utils.getChildDeep(this.owner, "mod_horn")), d.getIns().resetOutLine(utils.getChildDeep(this.owner, "mod_spinosaur"))
		}
		initData() {
			this.moveSpeed = 10, this.pathIndex = 1, this.moveVec = new Vector3(0, 0, 0), this.targetPos = new Vector3(0, 0, 0), this.tempVec3 = new Vector3(0, 0, 0), this.temp2Vec3 = new Vector3(0, 0, 0), this.temp3Vec3 = new Vector3(0, 0, 0), this.state = G.DINO_STEP.READY, this.searchEnemyCD = .7, this.fallSpeed = 10, this.size = 6, this.noRepeat = !0, this.dizyCD = 0
		}
		checkAtk() {
			let t = this.owner.transform.position,
				e = G.BattleScript.getCloseRole(this.searchBelo, t.x, t.z);
			if (e) {
				let i = e.transform.position;
				Math.abs(i.x - t.x) < 7 && Math.abs(i.z - t.z) < 7 && (this.owner.transform.lookAt(e.transform.position, cameraUtils.upPos), this.curR = this.owner.transform.localRotationEulerY, this.owner.transform.localRotationEulerY = this.curR + 180, this.doAttack(), e.script.death())
			}
		}
		obsDamage(t) {
			if (this.state != G.DINO_STEP.READY) {
				let e = D.obsConfig[t];
				this.hp -= e.dmg2 * this.maxhp, this.hp <= 0 && (this.hp = 0, this.beHit()), this.blood && (this.blood.visible = !0, this.blood.showCD = 1, this.blood.panelBlood.width = 155 * this.hp / this.maxhp)
			}
		}
		dizy() {
			this.dizyef ? this.dizyef.active = !0 : d.getIns().getModelById(20010, function (t) {
				this.owner.addChild(t), this.dizyef = t, d.getIns().setLocalPosition(t, 0, 7, 0), d.getIns().setLocalScale(t, 7)
			}.bind(this)), this.dizyCD = 1
		}
		setActive(t) {
			this.owner._children[1].active != t && (this.owner._children[1].active = t, this.owner._children[2].active = t)
		}
	}
	class I extends Laya.Script3D {
		constructor() {
			super()
		}
		onAwake() {
			this.initData(), this.owner.script = this, this.isDino = !0, this.dieef = utils.getChildDeep(this.owner, "ef_jjdzkl_dieSmoke"), d.getIns().setLocalScale(this.owner, 2, 2, 2), this.collider = this.owner.addComponent(Laya.PhysicsCollider);
			let t = new Laya.BoxColliderShape(3, 2, 2);
			t._localOffset.y = .5, this.collider.colliderShape = t, d.getIns().getModelById(20003, function (t) {
				this.hitef = t
			}.bind(this));
			let e = G.BattleScript.camera.transform.position;
			d.getIns().setLocalPosition(this.owner, e.x + utils.random(-25, 25), e.y + 2, e.z + utils.random(15, 25)), this.state = G.DINO_STEP.RUN, this.playAni("Move", null, !0), this.out = new Laya.Vector4, d.getIns().resetOutLine(this.owner._children[0], null, .05)
		}
		behit(t, e) {
			if (this.state != G.DINO_STEP.DEATH) {
				if (this.hitef) {
					let e = this.hitef.clone();
					this.owner.addChild(e), e.transform.position = t, e.active = !0, Laya.timer.once(1e3, this, function () {
						e.destroy()
					})
				}
				this.state != G.DINO_STEP.READY && (this.hp -= e, this.hp <= 0 && (this.hp = 0, this.death()), this.blood && (this.blood.visible = !0, this.blood.showCD = 1, this.blood.panelBlood.width = 155 * this.hp / this.maxhp))
			}
		}
		death() {
			this.state != G.DINO_STEP.DEATH && (this.state = G.DINO_STEP.DEATH, this.playAni("FallDown", function () {
				let t = this.dieef.clone();
				this.owner.parent.addChild(t), t.transform.position = this.owner.transform.position, this.dieef.active = !0, this.owner.active = !1, Laya.timer.once(1e3, this, function () {
					this.owner.destroy(), t.destroy()
				}), G.BattleScript.addGold(this.money, t.transform.position)
			}.bind(this), !1))
		}
		obsDamage(t) {
			if (this.state != G.DINO_STEP.READY) {
				let t = D.obsConfig[3];
				this.hp -= t.dmg1 * this.maxhp, this.hp <= 0 && (this.hp = 0, this.death()), this.blood && (this.blood.visible = !0, this.blood.showCD = 1, this.blood.panelBlood.width = 155 * this.hp / this.maxhp)
			}
		}
		attack(t) {
			this.state = G.DINO_STEP.ATTACK, Laya.timer.once(500, this, function () {
				t.script.isDeath || t.script.death()
			}), this.playAni("Attack", function () {
				this.state = G.DINO_STEP.RUN
			}.bind(this), !0)
		}
		initData() {
			this.state = G.DINO_STEP.READY, this.moveVec3 = new Laya.Vector3, this.moveSpeed = 11, this.noRepeat = !1
		}
		setInfo(t) {
			let e = D.dinoConfig[t];
			this.hp = this.maxhp = this.hpbk = e.hp, this.money = e.gold
		}
		setActive(t) {
			this.owner._children[0]._children[1].active != t && (this.owner._children[0]._children[1].active = t)
		}
		onUpdate() {
			if (G.ISIOS && (G.BattleScript.camera.worldToViewportPoint(this.owner.transform.position, this.out), this.out.w > 0 && this.out.x >= 0 && this.out.x <= Laya.stage.width && this.out.y >= 0 && this.out.y <= Laya.stage.height ? this.setActive(!0) : this.setActive(!1)), G.BattleScript.gameState == G.GAME_STEP.END) return "Move" != this.curAnim && (this.owner.transform.localRotationEulerX = 30, this.playAni("Move", null, !0)), this.owner.transform.localPositionX += this.moveVec3.x * G.FRAME_INTERVAL * this.moveSpeed, this.owner.transform.localPositionY += 10 * G.FRAME_INTERVAL, void (this.owner.transform.localPositionZ += this.moveVec3.z * G.FRAME_INTERVAL * this.moveSpeed);
			if (this.state == G.DINO_STEP.RUN) {
				if (G.BattleScript.firstRole && !G.BattleScript.firstRole.destroyed) {
					let t = G.BattleScript.firstRole.transform.position,
						e = this.owner.transform.position;
					this.moveVec3.x = t.x - e.x, this.moveVec3.y = t.y + 1 - e.y, this.moveVec3.z = t.z - e.z, Laya.Vector3.normalize(this.moveVec3, this.moveVec3), this.owner.transform.localPositionX += this.moveVec3.x * G.FRAME_INTERVAL * this.moveSpeed, this.owner.transform.localPositionY += this.moveVec3.y * G.FRAME_INTERVAL * this.moveSpeed, this.owner.transform.localPositionZ += this.moveVec3.z * G.FRAME_INTERVAL * this.moveSpeed, this.owner.transform.lookAt(t, cameraUtils.upPos)
				}
				this.checkAtk()
			}
		}
		checkAtk() {
			let t = this.owner.transform.position,
				e = G.BattleScript.getCloseRole(this.searchBelo, t.x, t.z);
			if (e) {
				let i = e.transform.position;
				Math.abs(i.x - t.x) < 2 && Math.abs(i.y - t.y) < 2 && Math.abs(i.z - t.z) < 2 && this.attack(e)
			}
		}
		checkRepeat(t) { }
		onDestroy() {
			this.owner.destroy()
		}
		playAni(t, e, i, s, a) {
			let n = this.owner.getChildAt(0)._hierarchyAnimator;
			if (n) {
				a ? n.crossFade(t, a, 0, 0) : n.play(t, 0, 0);
				var o = n._controllerLayers[0]._statesMap[t];
				o.script || (o.addScript(l), o.script = o._scripts[0], o.script.loop = i || o._clip.islooping, o.script.animator = n, o.script.animName = t), s || (s = 1), o.speed = s, o.script.setComplete(e), this.curAnim = n.curAnim = t
			} else console.error(this.owner, "动作控制器未加载！")
		}
		stopAnim(t) {
			let e = this.owner.getChildAt(0).getComponent(Laya.Animator);
			e && (t || (t = this.owner.curAnim), t && (e._controllerLayers[0]._statesMap[t].speed = 0))
		}
	}
	class M extends Laya.Script3D {
		constructor() {
			super()
		}
		onAwake() {
			this.owner.script = this, "Tube001zxc" != this.owner.name && "Tube002zxczv" != this.owner.name && "Tube003zv" != this.owner.name && "Tube004zb" != this.owner.name || (this.owner.isGunTong = !0)
		}
		beShot() {
			let t = this.owner.parent;
			for (; !t.script;) t = t.parent;
			t.script.beShot()
		}
		onTriggerEnter(t) {
			"Tube001zxc" != this.owner.name && "Tube002zxczv" != this.owner.name && "Tube003zv" != this.owner.name && "Tube004zb" != this.owner.name || (console.log(t.owner.name), t.owner.name.indexOf("role") > -1 ? t.owner.script.tumble() : t.owner.name.indexOf("Dragon") > -1 && t.owner.script.obsDamage(3))
		}
	}
	class x extends Laya.Script3D {
		constructor() {
			super()
		}
		onAwake() {
			this.owner.script = this, this.sprite3d = this.owner.getChildAt(0), this.collider = this.sprite3d.getComponent(Laya.PhysicsCollider), this.collider.collisionGroup = Laya.Physics3DUtils.COLLISIONFILTERGROUP_CUSTOMFILTER1, this.sprite3d.addComponent(M), ModelCfg.getIns().resetOutLine(this.owner, G.COLOR_WHITE, .2)
		}
		beShot() {
			Laya.timer.callLater(this, function () {
				this.collider.destroy()
			}.bind(this)), audioManager.playSound(12, null, !1), ModelCfg.getIns().playAnim(this.sprite3d, "play", this, function () {
				Laya.timer.callLater(this, function () {
					this.owner.destroy()
				})
			}.bind(this), .5)
		}
	}
	class A extends Laya.Script3D {
		constructor() {
			super()
		}
	}
	class E extends Laya.Script3D {
		constructor() {
			super()
		}
		onAwake() {
			this.owner.script = this, this.sprite3d = this.owner.getChildAt(0), utils.getChildDeep(this.owner, "ball").addComponent(M), this.sprite3d.addComponent(A), this.sprite3d.getComponent(A).dmg = function () {
				audioManager.playSound(9, null, !1), G.BattleScript.obsDamage(this.owner.transform.position, 2)
			}.bind(this), ModelCfg.getIns().resetOutLine(this.owner, G.COLOR_WHITE, .2)
		}
		beShot() {
			ModelCfg.getIns().playAnim(this.sprite3d, "play", this, function () {
				Laya.timer.callLater(this, function () {
					this.owner.destroy()
				})
			}.bind(this))
		}
	}
	class T extends Laya.Script3D {
		constructor() {
			super()
		}
		onAwake() {
			this.owner.script = this, utils.getChildDeep(this.owner, "bridge") ? this.sprite3d = utils.getChildDeep(this.owner, "bridge") : this.sprite3d = this.owner, utils.getChildDeep(this.sprite3d, "polySurface1170").addComponent(M), this.collider = utils.getChildDeep(this.sprite3d, "polySurface1170").getComponent(Laya.PhysicsCollider), this.collider.collisionGroup = Laya.Physics3DUtils.COLLISIONFILTERGROUP_CUSTOMFILTER1, this.isRelease = !1, utils.getChildDeep(this.owner, "wait").getComponent(Laya.PhysicsCollider).collisionGroup = Laya.Physics3DUtils.COLLISIONFILTERGROUP_CUSTOMFILTER2, ModelCfg.getIns().resetOutLine(this.owner, G.COLOR_WHITE, .2)
		}
		beShot() {
			this.isRelease || (this.isRelease = !0, G.BattleScript.releaseWaitQueue(), ModelCfg.getIns().playAnim(this.sprite3d, "play", this, null, 1.5))
		}
	}
	class R extends Laya.Script3D {
		constructor() {
			super()
		}
		onAwake() {
			this.owner.script = this, ModelCfg.getIns().resetOutLine(this.owner, G.COLOR_WHITE, .25)
		}
		beShot() {
			audioManager.playSound(8, null, !1);
			let t = this.owner.transform.position,
				e = (this.owner.parent, t.x),
				i = t.y,
				s = t.z;
			ModelCfg.getIns().getModelById(20006, function (t) {
				G.BattleScript.newScene.addChild(t), ModelCfg.getIns().setLocalPosition(t, e, i + 3, s), Laya.timer.once(1e3, this, function () {
					t.destroy()
				})
			}), G.BattleScript.obsDamage(this.owner.transform.position, 1), Laya.timer.callLater(this, function () {
				this.owner.destroy()
			}.bind(this))
		}
	}
	class P extends Laya.Script3D {
		constructor() {
			super()
		}
		onAwake() {
			this.owner.script = this, this.sprite3d = this.owner, this.isRelease = !1, utils.getChildDeep(this.sprite3d, "wait").getComponent(Laya.PhysicsCollider).collisionGroup = Laya.Physics3DUtils.COLLISIONFILTERGROUP_CUSTOMFILTER2, ModelCfg.getIns().resetOutLine(this.owner, G.COLOR_WHITE, .2)
		}
		beShot() {
			this.isRelease || (this.isRelease = !0, audioManager.playSound(7, null, !1), G.BattleScript.releaseWaitQueue(), ModelCfg.getIns().playAnim(this.sprite3d, "play", this, function () {
				Laya.timer.callLater(this, function () {
					this.owner.destroy()
				})
			}.bind(this), .7))
		}
	}
	class O extends Laya.Script3D {
		constructor() {
			super()
		}
		onAwake() {
			this.owner.script = this, this.sprite3D = this.owner._children[0], utils.getChildDeep(this.sprite3D, "Tube001zxc").addComponent(M), utils.getChildDeep(this.sprite3D, "Tube002zxczv").addComponent(M), utils.getChildDeep(this.sprite3D, "Tube003zv").addComponent(M), utils.getChildDeep(this.sprite3D, "Tube004zb").addComponent(M), utils.getChildDeep(this.sprite3D, "zxczxc").addComponent(M), ModelCfg.getIns().resetOutLine(this.owner, G.COLOR_WHITE, .2)
		}
		beShot() {
			this.isUsed || (this.isUsed = !0, utils.getChildDeep(this.sprite3D, "Tube001zxc").getComponent(Laya.PhysicsCollider).collisionGroup = Laya.Physics3DUtils.COLLISIONFILTERGROUP_CUSTOMFILTER2, utils.getChildDeep(this.sprite3D, "Tube002zxczv").getComponent(Laya.PhysicsCollider).collisionGroup = Laya.Physics3DUtils.COLLISIONFILTERGROUP_CUSTOMFILTER2, utils.getChildDeep(this.sprite3D, "Tube003zv").getComponent(Laya.PhysicsCollider).collisionGroup = Laya.Physics3DUtils.COLLISIONFILTERGROUP_CUSTOMFILTER2, utils.getChildDeep(this.sprite3D, "Tube004zb").getComponent(Laya.PhysicsCollider).collisionGroup = Laya.Physics3DUtils.COLLISIONFILTERGROUP_CUSTOMFILTER2, ModelCfg.getIns().playAnim(this.sprite3D, "play", this, function () {
				utils.getChildDeep(this.sprite3D, "Tube001zxc").destroy(), utils.getChildDeep(this.sprite3D, "Tube002zxczv").destroy(), utils.getChildDeep(this.sprite3D, "Tube003zv").destroy(), utils.getChildDeep(this.sprite3D, "Tube004zb").destroy()
			}.bind(this)))
		}
	}
	class k extends Laya.Script {
		constructor() {
			super(), G.SceneScript = this
		}
		onAwake() {
			this.owner.script = this, this.createObj()
		}
		createObj() {
			let t = utils.getChildDeep(this.owner, "obj");
			for (var e = 0; e < t.numChildren; e++) {
				let i = t._children[e],
					s = i.name.split("#"),
					a = i.name.split("_");
				if (s[0].indexOf("human") > -1) {
					for (let t = 0; t < s[1]; t++) G.BattleScript.createHelpRole(i.name, i.transform.position, 0 == t);
					let t = i.getComponent(Laya.PhysicsCollider);
					t && (t.collisionGroup = Laya.Physics3DUtils.COLLISIONFILTERGROUP_CUSTOMFILTER2)
				} else a[1] && ModelCfg.getIns().getModelById(a[1], function (t) {
					i.addChild(t), "board_40011" == s[0] ? t._children[0].addComponent(x) : "ball_40008" == s[0] ? t._children[0].addComponent(E) : "bridge_40012" == s[0] ? t._children[0].addComponent(T) : "baffle_40010" == s[0] ? t._children[0].addComponent(P) : "barrel_40007" == s[0] ? t._children[0].addComponent(R) : "pipe_40009" == s[0] && t._children[0].addComponent(O)
				})
			}
			this.tri = utils.getChildDeep(this.owner, "tri");
			for (e = 0; e < this.tri.numChildren; e++) {
				let i = this.tri._children[e];
				if ("tri2" == i.name.split("_")[0]) {
					let e = i.name.split("_")[1].split("#"),
						s = e[0],
						a = e[1],
						n = e[3],
						o = e[2],
						r = utils.getChildDeep(t, o).transform.position;
					for (let t = 0; t < a; t++) G.BattleScript.createSleepDino(s, r, n, o)
				}
				let s = i.getComponent(Laya.PhysicsCollider);
				s && (s.collisionGroup = Laya.Physics3DUtils.COLLISIONFILTERGROUP_CUSTOMFILTER2)
			}
			var i = utils.getChildDeep(this.owner, "base");
			this.loadCnt = 0;
			for (e = 0; e < i.numChildren; e++) {
				this.loadCnt++;
				let t = i._children[e],
					s = t.name.split("_");
				ModelCfg.getIns().getModelById(s[1], function (e) {
					if (t.addChild(e), s[0].indexOf("mode") > -1) {
						let t = e._children[0]._children[0].getComponent(Laya.PhysicsCollider);
						t && (t.collisionGroup = Laya.Physics3DUtils.COLLISIONFILTERGROUP_CUSTOMFILTER1)
					}
					"40005" == s[1] ? (G.BattleScript.jumpCamera = utils.getChildDeep(e, "jumpCamera"), G.BattleScript.endCamera = utils.getChildDeep(e, "endCamera"), G.BattleScript.jumpCamera.active = !1, this.endModel = e) : "40013" == s[1] && (this.house = e), this.loadCnt--, 0 == this.loadCnt && (this.isLoadComplete = !0)
				}.bind(this))
			}
			var s = utils.getChildDeep(this.owner, "Camera");
			for (e = 0; e < s.numChildren; e++) {
				let t = utils.getChildDeep(s._children[e], "CamP");
				if (t) {
					t.getComponent(Laya.PhysicsCollider).collisionGroup = Laya.Physics3DUtils.COLLISIONFILTERGROUP_CUSTOMFILTER2
				}
			}
		}
		openDoor() {
			this.playAni(this.house, "open")
		}
		playAni(t, e, i, s, a, n) {
			let o = t._children[0].getComponent(Laya.Animator);
			if (o) {
				n ? o.crossFade(e, n, 0, 0) : o.play(e, 0, 0);
				var r = o._controllerLayers[0]._statesMap[e];
				r.script || (r.addScript(l), r.script = r._scripts[0], r.script.loop = s || r._clip.islooping, r.script.animator = o, r.script.animName = e), a || (a = 1), r.speed = a, r.script.setComplete(i), this.curAnim = o.curAnim = e
			} else console.error(this.curModel, "动作控制器未加载！")
		}
		onUpdate() {
			G.FRAME_INTERVAL;
			for (var t = 0; t < this.tri.numChildren; t++) {
				this.tri._children[t]
			}
		}
		onEnable() { }
		onDisable() { }
		onDestroy() { }
	}
	class B extends Laya.Script3D {
		constructor() {
			super()
		}
		onAwake() {
			this.owner.script = this, this.sprite3d = this.owner.getChildAt(0).getChildAt(0), this.lxj = utils.getChildDeep(this.owner, "Helice_0")
		}
		startFly(t) {
			this.playAni("fly", t)
		}
		onUpdate() {
			this.lxj.transform.localRotationEulerZ -= 5
		}
		playAni(t, e, i, s, a) {
			let n = this.sprite3d._hierarchyAnimator;
			if (n) {
				a ? n.crossFade(t, a, 0, 0) : n.play(t, 0, 0);
				var o = n._controllerLayers[0]._statesMap[t];
				o.script || (o.addScript(l), o.script = o._scripts[0], o.script.loop = i || o._clip.islooping, o.script.animator = n, o.script.animName = t), s || (s = 1), o.speed = s, o.script.setComplete(e), this.curAnim = n.curAnim = t
			} else console.error(this.owner, "动作控制器未加载！")
		}
		stopAnim(t) {
			let e = this.owner.getChildAt(0).getComponent(Laya.Animator);
			e && (t || (t = this.owner.curAnim), t && (e._controllerLayers[0]._statesMap[t].speed = 0))
		}
	}
	class V extends Laya.Script3D {
		constructor() {
			super(), this._tempVector3 = new Laya.Vector3, this.yawPitchRoll = new Laya.Vector3, this.resultRotation = new Laya.Quaternion, this.tempRotationZ = new Laya.Quaternion, this.tempRotationX = new Laya.Quaternion, this.tempRotationY = new Laya.Quaternion, this.rotaionSpeed = 6e-5
		}
		onAwake() {
			Laya.stage.on(Laya.Event.MOUSE_DOWN, this, this.mouseDown), Laya.stage.on(Laya.Event.MOUSE_UP, this, this.mouseUp), this.camera = this.owner
		}
		_onDestroy() {
			Laya.stage.off(Laya.Event.MOUSE_DOWN, this, this.mouseDown), Laya.stage.off(Laya.Event.MOUSE_UP, this, this.mouseUp)
		}
		onUpdate(t) {
			var e = Laya.timer.delta;
			if (!isNaN(this.lastMouseX) && !isNaN(this.lastMouseY) && this.isMouseDown) {
				this.owner.scene;
				Laya.KeyBoardManager.hasKeyDown(87) && this.moveForward(-.01 * e), Laya.KeyBoardManager.hasKeyDown(83) && this.moveForward(.01 * e), Laya.KeyBoardManager.hasKeyDown(65) && this.moveRight(-.01 * e), Laya.KeyBoardManager.hasKeyDown(68) && this.moveRight(.01 * e), Laya.KeyBoardManager.hasKeyDown(81) && this.moveVertical(.01 * e), Laya.KeyBoardManager.hasKeyDown(69) && this.moveVertical(-.01 * e);
				var i = Laya.stage.mouseX - this.lastMouseX,
					s = Laya.stage.mouseY - this.lastMouseY,
					a = this.yawPitchRoll;
				a.x -= i * this.rotaionSpeed * e, a.y -= s * this.rotaionSpeed * e, this.updateRotation()
			}
			this.lastMouseX = Laya.stage.mouseX, this.lastMouseY = Laya.stage.mouseY
		}
		mouseDown(t) {
			this.camera.transform.localRotation.getYawPitchRoll(this.yawPitchRoll), this.lastMouseX = Laya.stage.mouseX, this.lastMouseY = Laya.stage.mouseY, this.isMouseDown = !0
		}
		mouseUp(t) {
			this.isMouseDown = !1
		}
		moveForward(t) {
			this._tempVector3.x = 0, this._tempVector3.y = 0, this._tempVector3.z = t, this.camera.transform.translate(this._tempVector3)
		}
		moveRight(t) {
			this._tempVector3.y = 0, this._tempVector3.z = 0, this._tempVector3.x = t, this.camera.transform.translate(this._tempVector3)
		}
		moveVertical(t) {
			this._tempVector3.x = this._tempVector3.z = 0, this._tempVector3.y = t, this.camera.transform.translate(this._tempVector3, !1)
		}
		updateRotation() {
			Math.abs(this.yawPitchRoll.y) < 1.5 && (Laya.Quaternion.createFromYawPitchRoll(this.yawPitchRoll.x, this.yawPitchRoll.y, this.yawPitchRoll.z, this.tempRotationZ), this.tempRotationZ.cloneTo(this.camera.transform.localRotation), this.camera.transform.localRotation = this.camera.transform.localRotation)
		}
	}
	class U extends Laya.Script {
		constructor() {
			super(), G.BattleScript = this
		}
		onAwake() {
			this.owner.script = this, this.nullMat = new Laya.BlinnPhongMaterial, Laya.Texture2D.load("res/texture/null.png", Laya.Handler.create(null, function (t) {
				this.nullMat.albedoTexture = t, this.nullMat.renderMode = Laya.BlinnPhongMaterial.RENDERMODE_TRANSPARENT
			}.bind(this))), this._ray = new Laya.Ray(new Laya.Vector3(0, 0, 0), new Laya.Vector3(0, 0, 0)), this.point = new Laya.Vector2, this.outs = [], this.hitres = new Laya.HitResult, this.img_medium = this.owner.getChildByName("img_medium"), this.box_victory = this.owner.getChildByName("box_victory"), this.label_bet = utils.getChildDeep(this.owner, "label_bet"), this.btn_home = this.owner.getChildByName("btn_home"), this.label_bet.timeline = new Laya.TimeLine, this.label_bet.timeline.to(this.label_bet, {
				scaleX: 1.2,
				scaleY: 1.2
			}, 50, null, 0).to(this.label_bet, {
				scaleX: 1,
				scaleY: 1
			}, 50, null, 0), G.COLOR_WHITE = new Laya.Vector4(.95, .95, .95, 1), G.COLOR_RED = new Laya.Vector4(.9, 0, 0, 1), this.initData(), this.initEvent()
		}
		initData() {
			this.isClick = !1, this.gameState = G.GAME_STEP.IDLE, this.roleArr = [], this.helpArr = {}, this.peopleCnt = 0, this.dinoQueue = [], this.sleepDino = {}, this.dinoArr = [], this.canShoot = !1, this.isWin = !1, this.isFail = !1, this.tempVec3 || (this.tempVec3 = new Laya.Vector3(0, 0, 0)), this.totalGold = 0, this.safeCnt = 0, this.isSwitchCameraEnd = !1, this.btn_home.visible = !1, this.helpNode = [], Laya.timer.scale = 1
		}
		onEnable() {
			this.newScene = this.owner.addChild(new Laya.Scene3D), this.newScene.zOrder = -1, d.getIns().getModelById(60001, function (t) {
				this.newScene.addChild(t)
			}.bind(this)), this.camera = cameraUtils.createCamera(new Laya.Vector3(0, 0, 0), new Laya.Vector3(-30, 0, 0)), this.newScene.addChild(this.camera), this.camera.fieldOfView = 70, this.newScene.ambientColor = new Laya.Vector3(.6, .6, .6);
			var t = new Laya.DirectionLight;
			this.newScene.addChild(t), t.color = new Laya.Vector3(1, 1, .705), t.intensity = .9, t.transform.position = new Laya.Vector3(1.41, 10.65, -17.23), t.transform.rotationEuler = new Laya.Vector3(-45, 60, 0), this.newScene.enableFog = !0, this.newScene.fogColor = new Vector3(1, 138 / 255, 75 / 255), this.newScene.fogStart = 250, this.newScene.fogRange = 400;
			for (var e = 0; e < 10; e++) {
				let t = 30001 + e;
				d.getIns().getModelById(t, function (t) {
					this.newScene.addChild(t), d.getIns().setLocalPosition(t, 0, 500, 0), updateManager.timeOnce(1e3, this, function () {
						t.destroy()
					})
				}.bind(this))
			}
			d.getIns().getModelById(20004, function (t) {
				this.hitlandef = t
			}.bind(this)), d.getIns().getModelById(20005, function (t) {
				this.hitseaef = t
			}.bind(this)), this.initGame()
		}
		rayCast(t, e, i) {
			if (this.outs.length > 0) var s = this.outs.pop();
			else s = new Laya.HitResult;
			return this.newScene.physicsSimulation.raycastFromTo(t, e, s, i, i), s
		}
		recycleHitRes(t) {
			this.outs.push(t)
		}
		initEvent() {
			this.owner.on(Laya.Event.MOUSE_DOWN, this, this.onDown), this.owner.on(Laya.Event.MOUSE_MOVE, this, this.onMove), this.owner.on(Laya.Event.MOUSE_UP, this, this.onUp), this.owner.on(Laya.Event.MOUSE_OUT, this, this.onUp), utils.onBtnScaleEvent(this.btn_home, this, function () {
				G.PULLOUT_TRYOUTUI = !0, this.gameState = G.GAME_STEP.END, this.img_medium.visible = !1, this.gunModel.script.hide(), s.getIns().setTryoutID(0), this.clearModel(), this.initGame(), G.MainUI.updateUI(), audioManager.stopMusic(), audioManager.playMusic(1), window.uleeSDK && uleeSDK.showAD(!0)
			})
		}
		onUpdate() {
			let t = G.FRAME_INTERVAL;
			if (this.gameState == G.GAME_STEP.START || this.gameState == G.GAME_STEP.RUSH) {
				if (this.createDinoCD -= t, this.isTouch && this.gunModel.script.shootCD <= 0 && (this.gunModel.script.shoot(), this.point.x = this.img_medium.x, this.point.y = this.img_medium.y, this.camera.viewportPointToRay(this.point, this._ray), this.newScene.physicsSimulation.rayCast(this._ray, this.hitres), this.hitres.succeeded))
					if (this.hitres.collider.owner.script && this.hitres.collider.owner.script.isDino) window.uleeSDK && "wx" == uleeSDK.pf && uleeSDK.startVibrate(!1), this.hitres.collider.owner.script.behit(this.hitres.point, this.gunModel.script.damage);
					else if ("sea" == this.hitres.collider.owner.name) {
						let t = this.hitseaef.clone();
						this.newScene.addChild(t), d.getIns().setLocalPosition(t, this.hitres.point.x, this.hitres.point.y, this.hitres.point.z), updateManager.timeOnce(.5, this, function () {
							t.destroy()
						})
					} else {
						let t = this.hitlandef.clone();
						this.newScene.addChild(t), d.getIns().setLocalPosition(t, this.hitres.point.x, this.hitres.point.y, this.hitres.point.z), updateManager.timeOnce(1, this, function () {
							t.destroy()
						}), this.hitres.collider.owner.script && this.hitres.collider.owner.script.beShot && (window.uleeSDK && "wx" == uleeSDK.pf && uleeSDK.startVibrate(!1), this.hitres.collider.owner.script.beShot())
					}
				for (let t = 0; t < this.roleArr.length; t++) {
					let e = this.roleArr[t];
					if (e.script.isDeath) this.roleArr.removeAt(t), t--;
					else
						for (let i = t + 1; i < this.roleArr.length; i++) {
							let t = this.roleArr[i];
							t.script.isDeath || e.script.checkRole(t)
						}
				}
				for (var e = 0; e < this.dinoArr.length; e++) {
					let t = this.dinoArr[e];
					if (t.destroyed) this.dinoArr.removeAt(e), e--;
					else if (t.script.state != G.DINO_STEP.DEATH && t.script.noRepeat)
						for (var i = e + 1; i < this.dinoArr.length; i++) {
							let e = this.dinoArr[i];
							!e.destroyed && e.script.state != G.DINO_STEP.DEATH && e.script.noRepeat && t.script.checkRepeat(e)
						}
				}
				for (let e = 0; e < this.dinoQueue.length; e++) {
					let i = this.dinoQueue[e];
					i.doTime -= t, i.doTime <= 0 && (this.createDinos(i), this.dinoQueue.removeAt(e), e--)
				}
				if (this.gameState == G.GAME_STEP.RUSH && this.cameraTargetPos) {
					let t = this.camera.transform.position;
					this.tempVec3.x = this.cameraTargetPos.x - t.x, this.tempVec3.y = this.cameraTargetPos.y - t.y, this.tempVec3.z = this.cameraTargetPos.z - t.z, Math.abs(this.tempVec3.x) < .1 && Math.abs(this.tempVec3.y) < .1 && Math.abs(this.tempVec3.z) < .1 && (this.cameraTargetPos = null, console.log("到达")), Laya.Vector3.normalize(this.tempVec3, this.tempVec3), this.camera.transform.localPositionX += .2 * this.tempVec3.x, this.camera.transform.localPositionY += .2 * this.tempVec3.y, this.camera.transform.localPositionZ += .2 * this.tempVec3.z, this.camera.transform.lookAt(this.cameraTarget.transform.position, cameraUtils.upPos)
				}
			}
			if (this.gameState == G.GAME_STEP.IDLE) cameraUtils.HandleRotateMovement({
				x: 1,
				y: 0
			}), G.MainUI.updateGetCoin();
			else if (this.isFail) cameraUtils.HandleRotateMovement({
				x: 3,
				y: 0
			});
			else {
				if (this.gameState != G.GAME_STEP.RUSH) {
					this.camera.transform.lookAt(this.cameraTarget.transform.position, cameraUtils.upPos);
					let t = utils.getChildDeep(this.cameraPath, "Camera" + this.cameraIndex).transform.position,
						e = this.camera.transform.position;
					Laya.Vector3.lerp(e, t, .005, this.tempVec3), this.camera.transform.localPositionX = this.tempVec3.x, this.camera.transform.localPositionY = this.tempVec3.y, this.camera.transform.localPositionZ = this.tempVec3.z
				}
				this.firstRole && !this.firstRole.destroyed && (Laya.Vector3.lerp(this.cameraTarget.transform.position, this.firstRole.transform.position, .05, this.tempVec3), this.cameraTarget.transform.localPositionX = this.tempVec3.x, this.cameraTarget.transform.localPositionY = this.tempVec3.y, this.cameraTarget.transform.localPositionZ = this.tempVec3.z), this.switchRole()
			}
		}
		initGame() {
			this.camera && (d.getIns().setLocalPosition(this.camera, 0, 0, 0), cameraUtils.setTarget(null, this.camera), this.camera.active = !0), this.img_medium.visible = !1, this.initScene()
		}
		startGame() {
			if (this.gameState == G.GAME_STEP.IDLE) {
				audioManager.stopMusic(), audioManager.playMusic(1), this.gameState = G.GAME_STEP.READY, this.cameraTarget ? d.getIns().setLocalPosition(this.cameraTarget, 0, 0, 0) : (this.cameraTarget = new Laya.MeshSprite3D(Laya.PrimitiveMesh.createBox(1, 1, 1)), this.cameraTarget.meshRenderer.material = this.nullMat, this.newScene.addChild(this.cameraTarget)), this.cameraIndex = 1;
				let e = utils.getChildDeep(this.cameraPath, "Camera" + this.cameraIndex).transform.position;
				this.camera.transform.localPositionX = e.x, this.camera.transform.localPositionY = e.y, this.camera.transform.localPositionZ = e.z, this.tempVec3.x = 0, this.tempVec3.y = 0, this.tempVec3.z = 0, this.camera.transform.lookAt(this.tempVec3, cameraUtils.upPos), this.cameraIndex++, this.createGun(() => {
					Laya.timer.once(2e3, this, function () {
						this.gameState = G.GAME_STEP.START, this.gunModel.script.show(function () {
							10001 != this.gunModel.script.gunId && (this.img_medium.y = 1035), this.canShoot = !0, this.img_medium.visible = !0, this.btn_home.visible = !0
						}.bind(this))
					})
				}), G.SceneScript.openDoor(), d.getIns().getModelById(20006, function (t) {
					this.sceneModel.addChild(t), d.getIns().setLocalPosition(t, 0, 0, 0)
				}.bind(this));
				for (var t = 0; t < this.roleArr.length; t++) {
					this.roleArr[t].script.startRun()
				}
			}
		}
		createGun(t) {
			this.img_medium.x = Laya.stage.width / 2, this.img_medium.y = Laya.stage.height / 2;
			var e = s.getIns().tryoutID;
			e || (e = s.getIns().curSkin);
			var i = D.gunConfig[e];
			s.getIns().curGoldSkin == i.id ? d.getIns().getModelById(i.modelidG, function (i) {
				this.camera.addChild(i), this.gunModel = i, this.gunModel.addComponent(_), this.gunModel.script.initData(e), G.GUN = this.gunModel, console.log("枪支加载完毕==============1"), t && t()
			}.bind(this)) : d.getIns().getModelById(i.modelid, function (i) {
				this.camera.addChild(i), this.gunModel = i, this.gunModel.addComponent(_), this.gunModel.script.initData(e), G.GUN = this.gunModel, console.log("枪支加载完毕==============2"), t && t()
			}.bind(this))
		}
		endGame(t) {
			this.gameState != G.GAME_STEP.END && (window.uleeSDK && uleeSDK.showAD(!1), this.box_victory.visible = !1, this.gameState = G.GAME_STEP.END, this.img_medium.visible = !1, this.gunModel.script.hide(), audioManager.stopMusic(), t ? (console.log("游戏胜利"), audioManager.playSound(2, null, !1), this.isWin = !0, uiManager.openUI("game/VictoryView.scene", null, {
				num: this.safeCnt,
				gold: this.totalGold
			})) : (console.log("游戏失败"), audioManager.playSound(3, null, !1), Laya.Timer.scale = .5, cameraUtils.r = Laya.Vector3.distance(this.cameraTarget.transform.position, this.camera.transform.position), cameraUtils.setTargetR(40), cameraUtils.setTarget(this.cameraTarget, this.camera), this.isFail = !0, Laya.timer.once(1e3, this, function () {
				uiManager.openUI("game/DefeatView.scene")
			})))
		}
		safeRole(t) {
			this.safeCnt++, this.label_bet.value = "X " + (1 + .2 * this.safeCnt).toFixed(1), this.label_bet.scaleX = 1, this.label_bet.scaleY = 1, this.label_bet.timeline.play(0, !1), t.removeSelf(), this.helicoptor._children[0]._children[0].addChild(t), d.getIns().setLocalPosition(t, 5 - utils.random(0, 2), 14 + utils.random(0, 6), 2.5), t.transform.localRotationEulerX = 90, t.transform.localRotationEulerY = 0, audioManager.playSound(13, null, !0), this.safeCnt >= this.roleArr.length && (this.helicoptor.script.startFly(), Laya.timer.once(1500, this, function () {
				this.endGame(!0)
			}))
		}
		addMonsterBlood(t) {
			utils.crateView("game/blood.scene", this, function (e) {
				this.owner.addChild(e), t.script.setBlood(e), e.visible = !1
			})
		}
		createRole(t) {
			d.getIns().getModelById(50001, function (e) {
				if (this.sceneModel.addChild(e), this.roleArr.push(e), this.firstRole || (this.firstRole = e), e.addComponent(b), d.getIns().setMaterialPic(utils.getChildDeep(e, "Cartoonish.069"), "res/texture/blue.png"), !G.ISIOS) {
					utils.getChildDeep(e, "Cartoonish.069").skinnedMeshRenderer
				}
				t ? e.script.airborne() : (d.getIns().setLocalPosition(e, utils.random(-4, 4), 0, utils.random(-4, 4)), e.active = !1)
			}.bind(this)), this.peopleCnt++, this.peopleCnt < 2 + s.getIns().initPersonSkillLv && Laya.timer.callLater(this, this.createRole)
		}
		createHelpRole(t, e, i) {
			d.getIns().getModelById(50001, function (s) {
				if (this.sceneModel.addChild(s), !G.ISIOS) {
					utils.getChildDeep(s, "Cartoonish.069").skinnedMeshRenderer
				}
				s.addComponent(b), s.belo = t, this.helpArr[t] || (this.helpArr[t] = []), this.helpArr[t].push(s), s.script.setHelp(e.x + (14 * Math.random() - 7), 0, e.z + (14 * Math.random() - 7)), i && s.script.createHelpPZ()
			}.bind(this))
		}
		resumeRole(t) {
			d.getIns().setMaterialPic(utils.getChildDeep(t, "Cartoonish.069"), "res/texture/blue.png"), this.helpArr[t.belo].remove(t), this.peopleCnt++, this.roleArr.push(t)
		}
		setWaitQueue(t) {
			t.setWait()
		}
		releaseWaitQueue() {
			for (var t = 0; t < this.roleArr.length; t++) this.roleArr[t].script.releaseWait()
		}
		getHelpRole(t, e, i) {
			let s = this.helpArr[t];
			if (s && s.length > 0) {
				let t = 1e4,
					l = null;
				for (var a = 0; a < s.length; a++)
					if (!s[a].waitResume)
						if (s[a].script.isDeath) s.removeAt(a--);
						else {
							var n = s[a].transform.position,
								o = n.x - e,
								r = n.z - i;
							o * o + r * r < t && (l = s[a], t = o * o + r * r)
						} return l && (l.waitResume = !0), l
			}
		}
		getCloseRole(t, e, i) {
			let s = this.helpArr[t];
			var a = 100,
				n = null;
			if (s && s.length > 0) {
				for (var o = 0; o < s.length; o++) {
					if (s[o].script.isDeath) s.removeAt(o--);
					else (l = (r = s[o].transform.position).x - e) * l + (h = r.z - i) * h < a && (n = s[o], a = l * l + h * h)
				}
				n && (n.waitResume = !0)
			}
			for (o = 0; o < this.roleArr.length; o++) {
				var r, l, h;
				if (this.roleArr[o].script.isDeath) this.roleArr.removeAt(o--);
				else if (!this.roleArr[o].script.isSafe) (l = (r = this.roleArr[o].transform.position).x - e) * l + (h = r.z - i) * h < a && (n = this.roleArr[o], a = l * l + h * h)
			}
			if (n) return n
		}
		switchRole() {
			this.firstRole && this.firstRole.script.isDeath && (this.roleArr.remove(this.firstRole), this.firstRole = this.roleArr[0], this.firstRole && console.log("更换人质"))
		}
		createHelicopter() {
			d.getIns().getModelById(40017, function (t) {
				G.SceneScript.endModel.addChild(t), t.transform.localPositionY = -35, t.transform.localPositionZ = 10, t.transform.localPositionX = 17, t.transform.localRotationEulerZ = 90, t.transform.localRotationEulerY = 90, t.addComponent(B), this.helicoptor = t
			}.bind(this))
		}
		switchCamP(t) {
			t == utils.getChildDeep(this.cameraPath, "Camera" + this.cameraIndex) && this.cameraIndex++
		}
		obsDamage(t, e) {
			let i = D.obsConfig[e];
			for (var s = 0; s < this.roleArr.length; s++) {
				let e = this.roleArr[s];
				Laya.Vector3.distance(e.transform.position, t) <= i.limits && e.script.tumble()
			}
			for (s = 0; s < this.dinoArr.length; s++) {
				let a = this.dinoArr[s];
				a.destroyed ? (this.dinoArr.removeAt(s), s--) : Laya.Vector3.distance(a.transform.position, t) <= i.limits && a.script.obsDamage(e)
			}
		}
		awakenDino(t) {
			let e = t.name.split("_")[1].split("#")[2];
			for (var i = 0; i < this.sleepDino[e].length; i++) {
				this.sleepDino[e][i].script.awaken()
			}
		}
		addCreateDino(t) {
			null == t.doTime && (t.doTime = .5, this.dinoQueue.push(t))
		}
		createDinos(t) {
			let e = t.name.split("_")[1].split("#"),
				i = e[0],
				s = e[1],
				a = e[3],
				n = null;
			e[2] && (n = utils.getChildDeep(this.obj, e[2]).transform.position), G.ISIOS && (s = Math.ceil(s / 2)), this.createDino(i, n, a, s)
		}
		createDino(t, e, i, s) {
			d.getIns().getModelById(t, function (a) {
				this.newScene.addChild(a), 30004 == t ? a.addComponent(w) : 30008 == t || 30009 == t ? a.addComponent(C) : t < 30004 ? a.addComponent(v) : 30005 == t || 30006 == t || 30007 == t ? a.addComponent(L) : 30010 == t && a.addComponent(I), 30010 != t && (a.script.pathIndex = i, d.getIns().setLocalPosition(a, e.x + 6 * Math.random() - 3, e.y, e.z + 6 * Math.random() - 3)), a.script.setInfo(t), this.dinoArr.push(a), s > 1 && Laya.timer.once(utils.random(200, 300), this, this.createDino.bind(this, t, e, i, s - 1))
			}.bind(this))
		}
		createSleepDino(t, e, i, s) {
			d.getIns().getModelById(t, function (a) {
				this.newScene.addChild(a), 30004 == t ? a.addComponent(w) : t <= 30004 ? a.addComponent(v) : 30005 != t && 30006 != t && 30007 != t || a.addComponent(L), a.script.pathIndex = i, a.script.setSleep(), a.script.setInfo(t), d.getIns().setLocalPosition(a, e.x + 6 * Math.random() - 3, e.y, e.z + 6 * Math.random() - 3), this.sleepDino[s] || (this.sleepDino[s] = []), this.dinoArr.push(a), this.sleepDino[s].push(a)
			}.bind(this))
		}
		addGold(t, e) {
			this.totalGold += t
		}
		endCamera1() {
			this.gameState != G.GAME_STEP.RUSH && (Laya.timer.scale = .5, this.gameState = G.GAME_STEP.RUSH, cameraUtils.setTarget(null, null), this.cameraTargetPos = this.endCamera.transform.position)
		}
		endCamera2() {
			this.isSwitchCameraEnd || (this.isSwitchCameraEnd = !0, console.log("切换镜头"), this.label_bet.value = "X 1.0", Laya.timer.scale = 1, this.createHelicopter(), this.jumpCamera.active = !0, this.camera.active = !1, this.jumpCamera.clearFlag = Laya.BaseCamera.CLEARFLAG_DEPTHONLY, this.box_victory.visible = !0, this.btn_home.visible = !1)
		}
		initScene() {
			d.getIns().getModelById(playerData.getIns().level + 7e4, function (t) {
				this.newScene.addChild(t), this.sceneModel = t, t.addComponent(k), this.tri = utils.getChildDeep(t, "tri"), this.path = utils.getChildDeep(t, "path"), this.obj = utils.getChildDeep(t, "obj"), this.cameraPath = utils.getChildDeep(t, "Camera"), this.jumpCamera = utils.getChildDeep(t, "jumpCamera"), this.endCamera = utils.getChildDeep(t, "endCamera"), this.jumpCamera && (this.jumpCamera.active = !1), cameraUtils.setTarget(t, this.camera), cameraUtils.angleB = -50, cameraUtils.r = 200, cameraUtils.stopR(), this.createRole()
			}.bind(this))
		}
		getPath(t) {
			for (var e = 0; e < this.path._children.length; e++)
				if (this.path._children[e].name.indexOf(t) > -1) return this.path._children[e]
		}
		onDown(t) {
			this.canShoot && (this.isTouch = !0, this.lastX = t.stageX, this.lastY = t.stageY)
		}
		onUp(t) {
			this.isTouch = !1
		}
		onMove(t) {
			if (this.isTouch && (this.gameState == G.GAME_STEP.START || this.gameState == G.GAME_STEP.RUSH)) {
				if (G.MainUI.img_guide.visible = !1, this.img_medium.x += t.stageX - this.lastX, this.img_medium.y += t.stageY - this.lastY, this.img_medium.y > Laya.stage.height - 200 ? this.img_medium.y = Laya.stage.height - 200 : this.img_medium.y < 10 && (this.img_medium.y = 10), this.img_medium.x > Laya.stage.width - 30 ? this.img_medium.x = Laya.stage.width - 30 : this.img_medium.x < 30 && (this.img_medium.x = 30), this.lastX = t.stageX, this.lastY = t.stageY, this.point.x = this.img_medium.x, this.point.y = this.img_medium.y - 150, this.camera.viewportPointToRay(this.point, this._ray), this.newScene.physicsSimulation.rayCast(this._ray, this.hitres), this.hitres.succeeded) {
					this.gunModel.transform.lookAt(this.hitres.point, cameraUtils.upPos);
					let t = this.gunModel.transform.localRotationEulerX,
						e = this.gunModel.transform.localRotationEulerY;
					Laya.timer.callLater(this, function () {
						this.gunModel.transform.localRotationEulerX = t, this.gunModel.transform.localRotationEulerY = e, this.gunModel.transform.localRotationEulerZ = 0
					})
				}
				this.lastX = t.stageX, this.lastY = t.stageY
			}
		}
		clearModel() {
			this.sceneModel.destroy();
			for (var t = 0; t < this.dinoArr.length; t++) {
				this.dinoArr[t].destroy()
			}
			for (t = 0; t < this.roleArr.length; t++) {
				this.roleArr[t].destroy()
			}
			for (var e in this.helpArr)
				for (t = 0; t < this.helpArr[e].length; t++) {
					this.helpArr[e][t].destroy()
				}
			this.firstRole = null, this.gunModel && this.gunModel.destroy(), this.initData()
		}
		onDisable() { }
	}
	class N extends t {
		constructor() {
			super()
		}
		initData() {
			this.end = !1, this.dir = 0, this.zhuaNum = 3, this.pointArr = [], this.extend = !1, this.back = !1, this.backNode = null, this.obstacleArr = [], this.updateObs(), this.clickCD = .5, audioManager.playMusic(18)
		}
		initUI() {
			this.initTagUI(), this.initReportUI(), this.updateGold(), updateManager.frameLoop(1, this, this.loop);
			const t = Laya.Animation;
			this.ani = new t, this.addChild(this.ani), this.ani.loadAtlas("res/atlas/smoke.atlas"), this.ani.interval = 50, this.ani.index = 1, this.ani.scaleX = 2, this.ani.scaleY = 2, this.ani.visible = !1, this.ani.on(Laya.Event.COMPLETE, this, function () {
				this.ani.visible = !1
			})
		}
		initEvent() {
			utils.onBtnScaleEvent(this.btn_close, this, function () {
				this.end || this.showReport()
			}), this.box_obstacle.on(Laya.Event.MOUSE_DOWN, this, this.onDown), this.box_obstacle.on(Laya.Event.MOUSE_MOVE, this, this.onMove), this.box_obstacle.on(Laya.Event.MOUSE_UP, this, this.onUp)
		}
		updateGold() {
			utils.getChildDeep(this.box_coin, "label_num").text = s.getIns().gold
		}
		updateObs() {
			this.addPoint();
			for (var t = utils.random(3, 5), e = 0; e < t; e++) {
				var i = utils.random(0, this.pointArr.length - 1),
					s = this.pointArr[i];
				this.pointArr.removeAt(i), Math.random() < .2 ? this.createShiTou("common/img_gu3.png", s.x, s.y, "touGu") : Math.random() < .5 ? this.createShiTou("common/img_gu2.png", s.x, s.y, "tuiGu") : this.createShiTou("common/img_gu1.png", s.x, s.y, "suiGu")
			}
			var a = utils.random(3, 4);
			for (e = 0; e < a; e++) {
				i = utils.random(0, this.pointArr.length - 1), s = this.pointArr[i];
				this.pointArr.removeAt(i);
				var n = utils.random(1, 3);
				this.createShiTou("common/img_shi" + n + ".png", s.x, s.y, "shitou", n)
			}
			var o = utils.random(1, 2);
			for (e = 0; e < o; e++) {
				i = utils.random(0, this.pointArr.length - 1), s = this.pointArr[i];
				this.pointArr.removeAt(i), Math.random() > .5 ? this.createShiTou("common/img_jin.png", s.x, s.y, "gold_d") : this.createShiTou("common/img_coin2.png", s.x, s.y, "gold_x")
			}
			var r = [];
			for (e = 0; e < this.box_obstacle._children.length; e++) {
				var l = this.box_obstacle._children[e];
				l.range = {
					x: l.width / 2,
					y: l.height / 2
				}, r.push(this.box_obstacle._children[e])
			}
			this.obstacleArr = r
		}
		showReport() {
			for (var t = [], e = 0, i = 0, a = 0, n = 0, o = 0, r = 0; r < this.box_savePoint._children.length; r++) {
				var l = this.box_savePoint._children[r];
				"gold_d" == l.name ? e++ : "gold_x" == l.name ? i++ : "suiGu" == l.name ? a++ : "tuiGu" == l.name ? n++ : "touGu" == l.name && o++
			}
			e > 0 && t.push({
				name: "gold_d",
				num: e
			}), i > 0 && t.push({
				name: "gold_x",
				num: i
			}), a > 0 && t.push({
				name: "suiGu",
				num: a
			}), n > 0 && t.push({
				name: "tuiGu",
				num: n
			}), o > 0 && t.push({
				name: "touGu",
				num: o
			}), utils.getChildDeep(this.box_report, "list").array = t, utils.getChildDeep(this.box_report, "label_number").text = s.getIns().digNum + "/" + G.MAXTL, this.box_report.visible = !0, window.uleeSDK && uleeSDK.showAD(!0)
		}
		onDown(t) {
			if (!(this.clickCD > 0 || this.end || this.extend)) {
				if (this.zhuaNum <= 0) return console.log("机会已用完"), void (this.box_tag.visible = !0);
				this.touchPos = {
					x: t.stageX,
					y: t.stageY
				}
			}
		}
		onMove(t) {
			this.clickCD > 0 || this.extend || this.zhuaNum
		}
		onUp() {
			this.clickCD > 0 || this.end || this.extend || this.zhuaNum <= 0 || (this.extend = !0)
		}
		loop() {
			let t = G.FRAME_INTERVAL;
			if (this.clickCD -= t, this.extend) {
				var e = utils.transPos(this.img_zhua, this);
				if (e.x = e.x + this.img_zhua.width / 2, e.y = e.y + this.img_zhua.height / 2, this.back) {
					if (this.img_sheng.height -= 1500 * t, e.y <= 580) {
						console.log("收抓"), this.back = !1, this.extend = !1, this.img_sheng.height = 150, this.updateZhua(), this.zhuaNum--, this.zhuaNum <= 0 && window.uleeSDK && (uleeSDK.showInterstitialAD(), window.uleeSDK && "wx" == uleeSDK.pf && 1 == uleeSDK.gameConfig.touchMistake && uleeSDK.showInterstitialAD()), this.backNode && ("gold_d" == this.backNode.name ? audioManager.playSound(13, null, !0) : "gold_x" == this.backNode.name ? audioManager.playSound(13, null, !0) : "suiGu" == this.backNode.name ? audioManager.playSound(14, null, !0) : "tuiGu" == this.backNode.name ? audioManager.playSound(14, null, !0) : "touGu" == this.backNode.name && audioManager.playSound(14, null, !0), this.saveRes(), this.ani1.play(0, !1));
						for (var i = this.box_obstacle._children, s = 0, a = 0; a < i.length; a++) "shitou" != i[a].name && s++;
						s || this.updateObs()
					}
					this.backNode && (this.backNode.removeSelf(), this.img_zhua.addChild(this.backNode), this.backNode.x = this.img_zhua.width / 5, this.backNode.y = this.img_zhua.height / 2)
				} else {
					this.img_sheng.height += 400 * t, (e.x > Laya.stage.width || e.x < 0 || e.y > Laya.stage.height) && (this.back = !0);
					for (a = 0; a < this.obstacleArr.length; a++) {
						var n = this.obstacleArr[a];
						if (!(!n || n && n.destroyed)) {
							var o = utils.transPos(n, this);
							o.x = o.x + n.width / 2, o.y = o.y + n.height / 2, console.log(), e.x + this.img_zhua.width / 2 > o.x - n.range.x && e.x - this.img_zhua.width / 2 < o.x + n.range.x && e.y > o.y - n.range.y && e.y < o.y + n.range.y && (console.log(e.x - o.x), "shitou" == n.name ? (console.log("销毁"), audioManager.playSound(9, null, !1), this.ani.pos(n.x, n.y), this.ani.visible = !0, this.ani.play(0, !1), n.destroy(), this.back = !0) : "gold_d" != n.name && "gold_x" != n.name && "suiGu" != n.name && "tuiGu" != n.name && "touGu" != n.name || (this.back = !0, this.backNode = n, this.chaPos = {
								x: o.x - e.x,
								y: o.y - e.y
							}))
						}
					}
				}
			} else 0 == this.dir ? (this.img_sheng.rotation += 50 * t, this.img_sheng.rotation >= 75 && (this.dir = 1)) : 1 == this.dir && (this.img_sheng.rotation -= 50 * t, this.img_sheng.rotation <= -75 && (this.dir = 0))
		}
		createShiTou(t, e, i, s, a) {
			var n = new Laya.Image(t);
			this.box_obstacle.addChild(n), n.name = s, n.index = a, n.x = e, n.y = i, "suiGu" == s || "tuiGu" == s || "touGu" == s ? (n.x = e + 50 * (Math.random() - .5), n.y = i + 50 * (Math.random() - .5)) : "gold_d" != s && "gold_x" != s || (n.x = e + 50 * (Math.random() - .5), n.y = i + 50 * (Math.random() - .5))
		}
		addPoint() {
			this.pointArr = [];
			for (var t = parseInt(Laya.stage.width / 164), e = this.img_point.x, i = this.img_point.y, s = e, a = 0; a < 4; a++) {
				s = e;
				for (var n = 0; n < t; n++)(0 != a || 1 != n && 2 != n && 3 != n && 4 != n) && (this.pointArr.push({
					x: s + 35 * (Math.random() - .5),
					y: i + 40 * (Math.random() - .5)
				}), s += Laya.stage.width / t);
				i += 200
			}
		}
		updateZhua() {
			var t = this.box_zhua._children;
			t[t.length - this.zhuaNum].visible = !1
		}
		saveRes() {
			this.backNode.removeSelf(), this.box_savePoint.addChild(this.backNode), this.backNode.x = 0, this.backNode.y = 0, this.backNode.bottom = 0, this.backNode = null;
			for (var t = this.box_savePoint._children, e = 0, i = 0; i < t.length; i++) t[i].x = 30 * e, t[i].x > this.box_savePoint.width && (e = 0, t[i].x = 30 * e), e++
		}
		initTagUI() {
			this.box_tag.visible = !1, utils.onBtnScaleEvent(utils.getChildDeep(this.box_tag, "btn_close"), this, function () {
				this.box_tag.visible = !1, this.showReport()
			}), utils.onBtnScaleEvent(utils.getChildDeep(this.box_tag, "btn_get"), this, function () {
				var t = function () {
					this.box_tag.visible = !1, this.zhuaNum = 3;
					for (var t = this.box_zhua._children, e = 0; e < t.length; e++) t[e].visible = !0
				}.bind(this);
				uleeSDK ? (audioManager.setMusicMuted(!1), uleeSDK.showVideoAD(function () {
					t(), audioManager.huifuMusicMuted()
				}, function () {
					audioManager.huifuMusicMuted()
				})) : t()
			})
		}
		initReportUI() {
			this.box_report.visible = !1, utils.onBtnScaleEvent(utils.getChildDeep(this.box_report, "btn_home"), this, function () {
				this.end = !0, this.box_report.visible = !1, window.uleeSDK && "wx" == uleeSDK.pf && uleeSDK && uleeSDK.showAD(!1), audioManager.playSound(16, null, !1), this.moveCar()
			}), utils.onBtnScaleEvent(utils.getChildDeep(this.box_report, "btn_close"), this, function () {
				this.ani1.stop(), this.box_report.visible = !1, window.uleeSDK && "wx" == uleeSDK.pf && uleeSDK && uleeSDK.showAD(!1)
			}), utils.onBtnScaleEvent(utils.getChildDeep(this.box_report, "btn_again"), this, function () {
				this.ani1.stop(), this.box_report.visible = !1, window.uleeSDK && "wx" == uleeSDK.pf && uleeSDK && uleeSDK.showAD(!1);
				var t = function () {
					for (s.getIns().minusDigNum(); this.box_obstacle._children.length > 0;)
						for (var t = 0; t < this.box_obstacle._children.length; t++) this.box_obstacle._children[t].destroy();
					var e = this.box_zhua._children;
					for (t = 0; t < e.length; t++) e[t].visible = !0;
					this.initData()
				}.bind(this);
				s.getIns().digNum <= 0 ? (utils.prompt("Insufficient Time"), uiManager.openUI("game/GetTLView.scene", null, {
					callback: function (e) {
						e ? t() : this.moveCar()
					}.bind(this)
				})) : t()
			}), utils.listHandler(utils.getChildDeep(this.box_report, "list"), this, function (t, e) {
				var i = t.dataSource,
					s = utils.getChildDeep(t, "img_icon"),
					a = utils.getChildDeep(t, "label_num");
				"gold_d" == i.name ? s.skin = "common/img_jin.png" : "gold_x" == i.name ? s.skin = "common/img_coin2.png" : "suiGu" == i.name ? s.skin = "common/img_gu1.png" : "tuiGu" == i.name ? s.skin = "common/img_gu2.png" : "touGu" == i.name && (s.skin = "common/img_gu3.png"), a.text = "+" + i.num
			}, function (t) { })
		}
		moveCar() {
			this.ani1.play(0, !1);
			var t = new Laya.TimeLine;
			t.to(this.img_car, {}, 500).to(this.img_car, {
				x: -400
			}, 700).to(this.img_car, {}, 300).play(0, !1), t.on(Laya.Event.COMPLETE, this, function () {
				t.pause(), t.destroy();
				for (var e = utils.getChildDeep(this.box_report, "list").array, i = 0; i < e.length; i++) {
					var a = e[i];
					"gold_d" == a.name ? (s.getIns().addGold(100 * a.num), G.MainUI.updateCoin()) : "gold_x" == a.name ? (s.getIns().addGold(10 * a.num), G.MainUI.updateCoin()) : "suiGu" != a.name && "tuiGu" != a.name && "touGu" != a.name || s.getIns().addMaterial(a.name, a.num)
				}
				this.doClose(), G.MainUI.box_scene.visible = !0, window.uleeSDK && "wx" == uleeSDK.pf && uleeSDK.showBox(Laya.stage.height - 200)
			})
		}
		doClose() {
			super.doClose(), G.MainUI.updateDig(), audioManager.playMusic(1)
		}
	}
	class z extends t {
		constructor() {
			super()
		}
		initData() {
			this.ye_num = 0, this.ye2_num = 0;
			var t = (G.NOW - s.getIns().lastOnlineTime) / 1e3;
			this.gold = t >= 86400 ? 6e3 : 25 * parseInt(t / 360), t >= 7200 ? (this.ye_num = 2, this.ye2_num = 1) : t >= 3600 && (this.ye_num = 1)
		}
		initUI() {
			utils.getChildDeep(this.img_coin, "label_num").text = "x" + this.gold, utils.getChildDeep(this.img_ye, "label_num").text = "x" + this.ye_num, utils.getChildDeep(this.img_ye2, "label_num").text = "x" + this.ye2_num, utils.getChildDeep(this.img_coin_2, "label_num").text = "x" + 3 * this.gold, utils.getChildDeep(this.img_ye_2, "label_num").text = "x" + this.ye_num, utils.getChildDeep(this.img_ye2_2, "label_num").text = "x" + this.ye2_num, this.gold || (this.img_coin.visible = !1, this.img_coin_2.visible = !1, this.btn_getAD.visible = !1, this.btn_get.visible = !1), this.ye_num || (this.img_ye.visible = !1, this.img_ye_2.visible = !1), this.ye2_num || (this.img_ye2.visible = !1, this.img_ye2_2.visible = !1)
		}
		initEvent() {
			var t = this;
			utils.onBtnScaleEvent(this.btn_getAD, this, function (e) {
				var i = function () {
					s.getIns().updateOnlineTime(), s.getIns().addGold(3 * t.gold), t.ye_num && s.getIns().addMaterial("lanYe", t.ye_num), t.ye2_num && s.getIns().addMaterial("ziYe", t.ye2_num), utils.createCoinAnim2({
						x: e.stageX,
						y: e.stageY
					}, G.COINPOS, function () {
						t.doClose()
					}, 20)
				};
				uleeSDK ? (audioManager.setMusicMuted(!1), uleeSDK.showVideoAD(function () {
					i(), audioManager.huifuMusicMuted()
				}, function () {
					audioManager.huifuMusicMuted()
				})) : i()
			}), utils.onBtnScaleEvent(this.btn_get, this, function (e) {
				s.getIns().updateOnlineTime(), s.getIns().addGold(this.gold), this.ye_num && s.getIns().addMaterial("lvYe", this.ye_num), this.ye2_num && s.getIns().addMaterial("lanYe", this.ye2_num), utils.createCoinAnim2({
					x: e.stageX,
					y: e.stageY
				}, G.COINPOS, function () {
					t.doClose()
				}, 20)
			})
		}
		doClose() {
			super.doClose(), G.MainUI.updateCoin()
		}
	}
	class Y extends t {
		constructor() {
			super(), window.uleeSDK && uleeSDK.stopGameRecorder()
		}
		initData() { }
		initUI() { }
		initEvent() {
			utils.onBtnScaleEvent(this.btn_close, this, this.doClose), utils.onBtnScaleEvent(this.btn_share, this, () => {
				window.uleeSDK ? uleeSDK.shareGameRecorder(() => {
					this.doClose()
				}) : this.doClose()
			})
		}
		doClose() {
			this.argObj && this.argObj.callback && this.argObj.callback(), super.doClose()
		}
	}
	class K extends t {
		constructor() {
			super()
		}
		initData() {
			for (var t in this.startPos = new Laya.Vector2, this.touch = !1, this.selectData = D.gunConfig[s.getIns().curSkin], this.img_bg.skin = "nine/img_bg" + this.selectData.type + ".jpg", this.quality = 1, this.isDraw = !1, this.isDrawCD = .1, this.drawCount = 0, this.getArr = [], this.array1 = [], this.array2 = [], this.array3 = [], D.gunConfig) 1 == D.gunConfig[t].type ? this.array1.push(D.gunConfig[t]) : 2 == D.gunConfig[t].type ? this.array2.push(D.gunConfig[t]) : 3 == D.gunConfig[t].type && this.array3.push(D.gunConfig[t]);
			this.price1 = 2500, this.price2 = 1e4, this.price3 = 25e3
		}
		initUI() {
			this.list.array = this.array1, this.updateInfo(), this.initScene(), this.createModel(), this.updateBtns(), this.updateCoin(), this.ani1.play(0, !0), window.uleeSDK && uleeSDK.hideBanner()
		}
		initEvent() {
			var t = this;
			utils.onBtnScaleEvent(this.btn_close, this, this.doClose), utils.onBtnScaleEvent(this.btn_lock, this, function () {
				if (!this.isDraw) {
					var e = function () {
						s.getIns().addGoldSkin(t.selectData.id), s.getIns().setCurGoldSkin(t.selectData.id), t.updateInfo(), t.createModel()
					};
					uleeSDK ? (audioManager.setMusicMuted(!1), uleeSDK.showVideoAD(function () {
						e(), audioManager.huifuMusicMuted()
					}, function () {
						audioManager.huifuMusicMuted()
					})) : e()
				}
			}), utils.onBtnEvent(this.btn_select, this, function () {
				this.isDraw || (this.initSelect2(), s.getIns().curGoldSkin != this.selectData.id ? (utils.getChildDeep(this.btn_select, "img_select2").visible = !0, s.getIns().setCurGoldSkin(this.selectData.id)) : (utils.getChildDeep(this.btn_select, "img_select1").visible = !0, s.getIns().setCurGoldSkin(0)), this.createModel())
			}), utils.onBtnScaleEvent(utils.getChildDeep(this.btn_select2, "box_item1"), this, function () {
				this.isDraw || (this.initSelect(), this.quality = 1, this.list.selectedIndex = -1, this.list.array = this.array1, utils.getChildDeep(utils.getChildDeep(this.btn_select2, "box_item1"), "img_icon").visible = !0, this.updateBtns())
			}), utils.onBtnScaleEvent(utils.getChildDeep(this.btn_select2, "box_item2"), this, function () {
				this.isDraw || (this.initSelect(), this.quality = 2, this.list.selectedIndex = -1, this.list.array = this.array2, utils.getChildDeep(utils.getChildDeep(this.btn_select2, "box_item2"), "img_icon").visible = !0, this.updateBtns())
			}), utils.onBtnScaleEvent(utils.getChildDeep(this.btn_select2, "box_item3"), this, function () {
				this.isDraw || (this.initSelect(), this.quality = 3, this.list.selectedIndex = -1, this.list.array = this.array3, utils.getChildDeep(utils.getChildDeep(this.btn_select2, "box_item3"), "img_icon").visible = !0, this.updateBtns())
			}), utils.onBtnScaleEvent(this.btn_adGet, this, function (e) {
				this.isDraw || this.isPlayer || (this.isPlayer = !0, window.uleeSDK ? (audioManager.setMusicMuted(!1), uleeSDK.showVideoAD(function () {
					utils.createCoinAnim2({
						x: e.stageX,
						y: e.stageY
					}, G.COINPOS, function () {
						s.getIns().addGold(2500), t.updateCoin(), t.isPlayer = !1
					}, 10), audioManager.huifuMusicMuted()
				}, function () {
					t.isPlayer = !1, audioManager.huifuMusicMuted()
				})) : utils.createCoinAnim2({
					x: e.stageX,
					y: e.stageY
				}, G.COINPOS, function () {
					s.getIns().addGold(2500), t.updateCoin(), t.isPlayer = !1
				}, 10))
			}), utils.onBtnScaleEvent(this.btn_quality1, this, function () {
				if (!this.isDraw) {
					if (s.getIns().gold < this.price1) return utils.prompt("Insufficient Coin"), void audioManager.playSound(17, null, !1);
					s.getIns().addGold(-this.price1), this.getArr = this.getReward(), 1 == this.getArr.length ? (audioManager.playSound(5, null, !1), this.selectData = this.getArr[utils.random(0, this.getArr.length - 1)], s.getIns().setCurSkin(this.selectData.id), s.getIns().addOwnSkin(this.selectData.id), s.getIns().setCurGoldSkin(0), this.updateBtns(), this.list.refresh(), this.updateCoin(), this.lockInfo(), this.createModel(), this.updateInfo(), this.img_bg.skin = "nine/img_bg" + this.selectData.type + ".jpg") : (this.isDraw = !0, this.isDrawCD = .1, this.drawCount = 0)
				}
			}), utils.onBtnScaleEvent(this.btn_quality2, this, function () {
				if (!this.isDraw) {
					if (s.getIns().gold < this.price2) return utils.prompt("Insufficient Coin"), void audioManager.playSound(17, null, !1);
					s.getIns().addGold(-this.price2), this.getArr = this.getReward(), 1 == this.getArr.length ? (audioManager.playSound(5, null, !1), this.selectData = this.getArr[utils.random(0, this.getArr.length - 1)], s.getIns().setCurSkin(this.selectData.id), s.getIns().addOwnSkin(this.selectData.id), s.getIns().setCurGoldSkin(0), this.updateBtns(), this.list.refresh(), this.updateCoin(), this.lockInfo(), this.createModel(), this.updateInfo(), this.img_bg.skin = "nine/img_bg" + this.selectData.type + ".jpg") : (this.isDraw = !0, this.isDrawCD = .1, this.drawCount = 0)
				}
			}), utils.onBtnScaleEvent(this.btn_quality3, this, function () {
				if (!this.isDraw) {
					if (s.getIns().gold < this.price3) return utils.prompt("Insufficient Coin"), void audioManager.playSound(17, null, !1);
					s.getIns().addGold(-this.price3), this.getArr = this.getReward(), 1 == this.getArr.length ? (audioManager.playSound(5, null, !1), this.selectData = this.getArr[utils.random(0, this.getArr.length - 1)], s.getIns().setCurSkin(this.selectData.id), s.getIns().addOwnSkin(this.selectData.id), s.getIns().setCurGoldSkin(0), this.updateBtns(), this.list.refresh(), this.updateCoin(), this.lockInfo(), this.createModel(), this.updateInfo(), this.img_bg.skin = "nine/img_bg" + this.selectData.type + ".jpg", console.log(1)) : (this.isDraw = !0, this.isDrawCD = .1, this.drawCount = 0)
				}
			}), utils.listHandler(this.list, this, function (t, e) {
				this.list.array[e].index = e;
				var i = t.dataSource,
					a = utils.getChildDeep(t, "img_di"),
					n = utils.getChildDeep(t, "img_g"),
					o = utils.getChildDeep(t, "img_icon");
				a.skin = "common/img_di3.png", n.skin = "", dataManager.queryOwn(i.id) ? (o.skin = i.head, 1 == i.type ? n.skin = "common/img_di11.png" : 2 == i.type ? n.skin = "common/img_di12.png" : 3 == i.type && (n.skin = "common/img_di13.png")) : o.skin = "common/img_icon8.png", s.getIns().curSkin == i.id && (a.skin = "common/img_di4.png")
			}, function (t) {
				if (!(t < 0)) {
					var e = this.list.array[t];
					e.id != s.getIns().curSkin && dataManager.queryOwn(e.id) && (utils.prompt("Equipped Successfully"), audioManager.playSound(15, null, !0), this.selectData = e, s.getIns().setCurSkin(this.selectData.id), this.updateInfo(), this.createModel(), this.img_bg.skin = "nine/img_bg" + this.selectData.type + ".jpg")
				}
			}), this.box_scene.on(Laya.Event.MOUSE_DOWN, this, function (t) {
				this.startPos.x = t.stageX, this.touch = !0
			}), this.box_scene.on(Laya.Event.MOUSE_MOVE, this, function (t) {
				this.startPos.x > t.stageX ? this.model.transform.localRotationEulerY += 1 : this.startPos.x < t.stageX && (this.model.transform.localRotationEulerY -= 1), this.startPos.x = t.stageX
			}), this.box_scene.on(Laya.Event.MOUSE_UP, this, function (t) {
				this.touch = !1
			}), this.box_scene.on(Laya.Event.MOUSE_OUT, this, function (t) {
				this.touch = !1
			})
		}
		updateCoin() {
			utils.getChildDeep(this.box_coin, "label_num").text = s.getIns().gold
		}
		initScene() {
			this.newScene = this.box_scene.addChild(new Laya.Scene3D), this.camera = cameraUtils.createCamera(new Laya.Vector3(0, -8.5, 35), new Laya.Vector3(0, 0, 0), !1), this.newScene.addChild(this.camera), this.newScene.ambientColor = new Laya.Vector3(.8, .8, .8);
			var t = new Laya.DirectionLight;
			this.newScene.addChild(t), t.color = new Laya.Vector3(1, 1, 180 / 255), t.intensity = .9, t.transform.position = new Laya.Vector3(1.41, 10.65, -17.23), t.transform.rotationEuler = new Laya.Vector3(-45, 60, 0)
		}
		createModel() {
			var t = this;
			this.model && (this.model.destroy(), this.model = null);
			var e = D.gunConfig[this.selectData.id];
			s.getIns().curGoldSkin == e.id ? d.getIns().getModelById(e.modelidG, function (e) {
				t.newScene.addChild(e), t.model = e, d.getIns().setLocalRotation(e, 15, 0, 0)
			}) : d.getIns().getModelById(e.modelid, function (e) {
				t.newScene.addChild(e), t.model = e, d.getIns().setLocalRotation(e, 15, 0, 0)
			}), this.loop || (this.loop = updateManager.frameLoop(1, t, t.onLoop))
		}
		onLoop() {
			let t = G.FRAME_INTERVAL;
			if (!this.touch && this.model && (this.model.transform.localRotationEulerY += 1), this.isDraw)
				if (this.drawCount += t, this.isDrawCD -= t, this.drawCount >= 2) this.isDraw = !1, audioManager.playSound(5, null, !1), this.selectData = this.getArr[utils.random(0, this.getArr.length - 1)], utils.getChildDeep(this.list.cells[this.selectData.index], "img_di").skin = "common/img_di4.png", s.getIns().setCurSkin(this.selectData.id), s.getIns().addOwnSkin(this.selectData.id), s.getIns().setCurGoldSkin(0), this.updateBtns(), this.list.refresh(), this.lockInfo(), this.createModel(), this.updateInfo(), this.updateCoin(), this.img_bg.skin = "nine/img_bg" + this.selectData.type + ".jpg";
				else if (this.isDrawCD <= 0) {
					this.isDrawCD = .1;
					for (var e = utils.random(0, this.getArr.length - 1); this.laterNum == e;) e = utils.random(0, this.getArr.length - 1);
					this.laterNum = e;
					for (var i = 0; i < this.list.cells.length; i++) {
						var a = this.list.cells[i];
						utils.getChildDeep(a, "img_di").skin = "common/img_di3.png"
					}
					utils.getChildDeep(this.list.cells[this.getArr[e].index], "img_di").skin = "common/img_di39.png"
				}
		}
		updateInfo() {
			this.initSelect2(), D.gunConfig[this.selectData.id].modelidG ? dataManager.queryGoldSkin(this.selectData.id) ? (this.btn_lock.visible = !1, this.btn_select.visible = !0) : (this.btn_lock.visible = !0, this.btn_select.visible = !1) : (this.btn_lock.visible = !1, this.btn_select.visible = !1), s.getIns().curGoldSkin == this.selectData.id ? utils.getChildDeep(this.btn_select, "img_select2").visible = !0 : utils.getChildDeep(this.btn_select, "img_select1").visible = !0, 7 == this.selectData.id || 8 == this.selectData.id || 9 == this.selectData.id ? (this.img_info.visible = !0, this.label_info.text = "Fire Rate+15%") : 10 == this.selectData.id || 11 == this.selectData.id || 12 == this.selectData.id ? (this.img_info.visible = !0, this.label_info.text = "Fire Rate+20%") : 13 == this.selectData.id || 14 == this.selectData.id || 15 == this.selectData.id || 16 == this.selectData.id || 17 == this.selectData.id || 18 == this.selectData.id ? (this.img_info.visible = !0, this.label_info.text = "Fire Rate+33%") : this.img_info.visible = !1
		}
		initSelect() {
			utils.getChildDeep(utils.getChildDeep(this.btn_select2, "box_item1"), "img_icon").visible = !1, utils.getChildDeep(utils.getChildDeep(this.btn_select2, "box_item2"), "img_icon").visible = !1, utils.getChildDeep(utils.getChildDeep(this.btn_select2, "box_item3"), "img_icon").visible = !1
		}
		initSelect2() {
			utils.getChildDeep(this.btn_select, "img_select1").visible = !1, utils.getChildDeep(this.btn_select, "img_select2").visible = !1
		}
		updateBtns() {
			if (this.btn_adGet.visible = !1, this.btn_quality1.visible = !1, this.btn_quality2.visible = !1, this.btn_quality3.visible = !1, 1 == this.quality) {
				for (var t = !1, e = 0; e < this.array1.length; e++) dataManager.queryOwn(this.array1[e].id) || (t = !0);
				if (!t) return;
				this.btn_adGet.visible = !0, this.btn_quality1.visible = !0, utils.getChildDeep(this.btn_quality1, "label_num").text = this.price1
			} else if (2 == this.quality) {
				for (t = !1, e = 0; e < this.array2.length; e++) dataManager.queryOwn(this.array2[e].id) || (t = !0);
				if (!t) return;
				this.btn_adGet.visible = !0, this.btn_quality2.visible = !0, utils.getChildDeep(this.btn_quality2, "label_num").text = this.price2
			} else if (3 == this.quality) {
				for (t = !1, e = 0; e < this.array3.length; e++) dataManager.queryOwn(this.array3[e].id) || (t = !0);
				if (!t) return;
				this.btn_adGet.visible = !0, this.btn_quality3.visible = !0, utils.getChildDeep(this.btn_quality3, "label_num").text = this.price3
			}
		}
		getReward() {
			var t = [];
			if (1 == this.quality)
				for (var e = 0; e < this.array1.length; e++) dataManager.queryOwn(this.array1[e].id) || t.push(this.array1[e]);
			else if (2 == this.quality)
				for (e = 0; e < this.array2.length; e++) dataManager.queryOwn(this.array2[e].id) || t.push(this.array2[e]);
			else if (3 == this.quality)
				for (e = 0; e < this.array3.length; e++) dataManager.queryOwn(this.array3[e].id) || t.push(this.array3[e]);
			return t
		}
		lockInfo() {
			this.box_lockInfo.visible = !0, window.uleeSDK, this.inAnim(this.box_lockInfo);
			var t = utils.getChildDeep(this.box_lockInfo, "img_icon"),
				e = utils.getChildDeep(this.box_lockInfo, "img_g"),
				i = utils.getChildDeep(this.box_lockInfo, "btn_close");
			t.skin = this.selectData.head, 1 == this.selectData.type ? e.skin = "common/img_di11.png" : 2 == this.selectData.type ? e.skin = "common/img_di12.png" : 3 == this.selectData.type && (e.skin = "common/img_di13.png"), utils.onBtnScaleEvent(i, this, function () {
				this.outAnim(this.box_lockInfo, function () {
					this.box_lockInfo.visible = !1, window.uleeSDK, this.selectData.modelidG && uiManager.openUI("game/UpGunView.scene", null, {
						data: this.selectData,
						callback: function () {
							this.updateInfo(), this.createModel()
						}.bind(this)
					})
				}.bind(this))
			})
		}
		selectAnim() {
			for (var t = 0; t < 6; t++) updateManager.timeOnce(.15 * t, this, function () {
				t % 6 == 0 && 0
			})
		}
		inAnim(t) {
			var e = utils.getChildDeep(t, "img_mask");
			e.visible = !0, e.alpha = 0, t.scaleX = 0, t.scaleY = 0;
			var i = new Laya.TimeLine;
			i.to(t, {
				scaleX: 1.2,
				scaleY: 1.2
			}, 100).to(t, {
				scaleX: 1,
				scaleY: 1
			}, 100).play(0, !1), i.on(Laya.Event.COMPLETE, this, function () {
				i.pause(), i.destroy()
			});
			var s = new Laya.TimeLine;
			s.to(e, {
				alpha: .8
			}, 300).play(0, !1), s.on(Laya.Event.COMPLETE, this, function () {
				s.pause(), s.destroy()
			})
		}
		outAnim(t, e) {
			utils.getChildDeep(t, "img_mask").visible = !1;
			var i = new Laya.TimeLine;
			i.to(t, {
				scaleX: 1.2,
				scaleY: 1.2
			}, 100).to(t, {
				scaleX: 0,
				scaleY: 0
			}, 100).play(0, !1), i.on(Laya.Event.COMPLETE, this, function () {
				i.pause(), i.destroy(), e && e()
			})
		}
		doClose() {
			eventDispatcher.dispatchEvent(ulee.Event.ON_CHANGE_GOLD), this.argObj && this.argObj.callback && this.argObj.callback(), window.uleeSDK && "wx" == uleeSDK.pf && uleeSDK.showBox(Laya.stage.height - 200), super.doClose()
		}
	}
	class F extends t {
		constructor() {
			super()
		}
		initData() {
			this.mhindex = 1
		}
		initUI() {
			this.canTouch = !0, this.playNext()
		}
		initEvent() {
			this.box_mh.on(Laya.Event.MOUSE_DOWN, this, this.playNext)
		}
		playNext() {
			if (this.canTouch) {
				let t = this["ani" + this.mhindex];
				t ? (t.play(0, !1), this.canTouch = !1, t.on(Laya.Event.COMPLETE, this, function () {
					this.mhindex += 1, this.canTouch = !0, this.mhindex <= 4 ? Laya.timer.once(1e3, this, function () {
						this.canTouch && this.playNext()
					}) : this.label_tip.text = "Tap Screen to rescue"
				})) : this.doClose()
			}
		}
		doClose() {
			super.doClose(), uiManager.getUI("game/MainView.scene").visible = !0, G.MainUI.onStart(!1)
		}
	}
	class H extends t {
		constructor() {
			super(), G.hecheng = this
		}
		initData() {
			this.type = null, this.getData = null, this.selectIndex = 0, this.player = !1
		}
		initUI() {
			this.box_success.visible = !1, this.box_fail.visible = !1, this.box_fail2.visible = !1, this.box_tag.visible = !1, this.updateItem1(), this.updateItem2(), this.updateItem3(), this.updateGold(), this.updateUI(), this.updateMaterials(), this.img_item1.visible = !0, this.init3DScene(), audioManager.playMusic(18), this.updateBtn(this.btn_select1), window.uleeSDK && uleeSDK.showAD(!0)
		}
		initEvent() {
			var t = this;
			utils.onBtnScaleEvent(this.btn_close, this, function () {
				this.player || (this.doClose(), G.MainUI.box_scene.visible = !0, audioManager.playMusic(1), window.uleeSDK && "wx" == uleeSDK.pf && uleeSDK.showBox(Laya.stage.height - 200))
			}), utils.onBtnScaleEvent(utils.getChildDeep(this.img_item1, "btn_add1"), this, function () {
				var e = function () {
					s.getIns().addMaterial("suiGu", 1), t.updateMaterials()
				};
				window.uleeSDK ? uleeSDK.showVideoAD(function () {
					e()
				}, function () { }) : e()
			}), utils.onBtnScaleEvent(utils.getChildDeep(this.img_item1, "btn_add2"), this, function () {
				var e = function () {
					s.getIns().addMaterial("lvYe", 1), t.updateMaterials()
				};
				window.uleeSDK ? uleeSDK.showVideoAD(function () {
					e()
				}, function () { }) : e()
			}), utils.onBtnScaleEvent(utils.getChildDeep(this.img_item1, "btn_he"), this, function (e) {
				return this.img_item1.isGet ? s.getIns().gold < 500 ? (utils.prompt("Insufficient Coin"), void audioManager.playSound(17, null, !1)) : dataManager.getWarehouseNum() ? void (this.player || (this.player = !0, s.getIns().addGold(-500), this.updateGold(), this.createEffect(function () {
					s.getIns().minusMaterial("suiGu", 1), s.getIns().minusMaterial("lvYe", 1), t.type = "xiao", Math.random() < .9 ? (t.randomDinosaur("xiao"), s.getIns().addDinosaurType("xiao", 1, t.getData.id), t.updateSuccessUI("xiao")) : (t.box_fail2.visible = !0, t.inAnim(t.box_fail2), audioManager.playSound(17, null, !1)), t.updateItem1(), t.updateMaterials(), t.player = !1
				}))) : (this.box_tag.visible = !0, void this.inAnim(this.box_tag)) : (utils.prompt("Insufficient Material"), void audioManager.playSound(17, null, !1))
			}), utils.onBtnScaleEvent(utils.getChildDeep(this.img_item1, "btn_get"), this, function (e) {
				if (!this.img_item1.isGet) return utils.prompt("Insufficient Material"), void audioManager.playSound(17, null, !1);
				if (!dataManager.getWarehouseNum()) return this.box_tag.visible = !0, void this.inAnim(this.box_tag);
				if (!this.player) {
					this.player = !0;
					var i = function () {
						s.getIns().minusMaterial("suiGu", 1), s.getIns().minusMaterial("lvYe", 1), t.randomDinosaur("xiao"), s.getIns().addDinosaurType("xiao", 1, t.getData.id), t.updateSuccessUI("xiao"), t.updateItem1(), t.updateMaterials(), t.player = !1
					};
					window.uleeSDK ? uleeSDK.showVideoAD(function () {
						t.createEffect(i)
					}, function () { }) : this.createEffect(i)
				}
			}), utils.onBtnScaleEvent(utils.getChildDeep(this.img_item2, "btn_add1"), this, function () {
				var e = function () {
					s.getIns().addMaterial("suiGu", 3 - dataManager.getMaterial("suiGu")), t.updateMaterials()
				};
				window.uleeSDK ? uleeSDK.showVideoAD(function () {
					e()
				}, function () { }) : e()
			}), utils.onBtnScaleEvent(utils.getChildDeep(this.img_item2, "btn_add2"), this, function () {
				var e = function () {
					s.getIns().addMaterial("tuiGu", 1), t.updateMaterials()
				};
				window.uleeSDK ? uleeSDK.showVideoAD(function () {
					e()
				}, function () { }) : e()
			}), utils.onBtnScaleEvent(utils.getChildDeep(this.img_item2, "btn_add3"), this, function () {
				var e = function () {
					s.getIns().addMaterial("lanYe", 1), t.updateMaterials()
				};
				window.uleeSDK ? uleeSDK.showVideoAD(function () {
					e()
				}, function () { }) : e()
			}), utils.onBtnScaleEvent(utils.getChildDeep(this.img_item2, "btn_he"), this, function (e) {
				return this.img_item2.isGet ? s.getIns().gold < 1e3 ? (utils.prompt("Insufficient Coin"), void audioManager.playSound(17, null, !1)) : dataManager.getWarehouseNum() ? void (this.player || (this.player = !0, s.getIns().addGold(-1e3), this.updateGold(), this.createEffect(function () {
					s.getIns().minusMaterial("suiGu", 3), s.getIns().minusMaterial("tuiGu", 1), s.getIns().minusMaterial("lanYe", 1), t.type = "zhong", Math.random() < .6 ? (t.randomDinosaur("zhong"), s.getIns().addDinosaurType("zhong", 1, t.getData.id), t.updateSuccessUI("zhong")) : (t.randomDinosaur("xiao"), s.getIns().addDinosaurType("xiao", 1, t.getData.id), t.updateFailUI("xiao")), t.updateItem2(), t.updateMaterials(), t.player = !1
				}))) : (this.box_tag.visible = !0, void this.inAnim(this.box_tag)) : (utils.prompt("Insufficient Material"), void audioManager.playSound(17, null, !1))
			}), utils.onBtnScaleEvent(utils.getChildDeep(this.img_item2, "btn_get"), this, function (e) {
				if (!this.img_item2.isGet) return utils.prompt("Insufficient Material"), void audioManager.playSound(17, null, !1);
				if (!dataManager.getWarehouseNum()) return this.box_tag.visible = !0, void this.inAnim(this.box_tag);
				if (!this.player) {
					this.player = !0;
					var i = function () {
						s.getIns().minusMaterial("suiGu", 3), s.getIns().minusMaterial("tuiGu", 1), s.getIns().minusMaterial("lanYe", 1), t.randomDinosaur("zhong"), s.getIns().addDinosaurType("zhong", 1, t.getData.id), t.updateSuccessUI("zhong"), t.updateItem2(), t.updateMaterials(), t.player = !1
					};
					window.uleeSDK ? uleeSDK.showVideoAD(function () {
						t.createEffect(i)
					}, function () { }) : this.createEffect(i)
				}
			}), utils.onBtnScaleEvent(utils.getChildDeep(this.img_item3, "btn_add1"), this, function () {
				var e = function () {
					s.getIns().addMaterial("suiGu", 5 - dataManager.getMaterial("suiGu")), t.updateMaterials()
				};
				window.uleeSDK ? uleeSDK.showVideoAD(function () {
					e()
				}, function () { }) : e()
			}), utils.onBtnScaleEvent(utils.getChildDeep(this.img_item3, "btn_add2"), this, function () {
				var e = function () {
					s.getIns().addMaterial("tuiGu", 3 - dataManager.getMaterial("tuiGu")), t.updateMaterials()
				};
				window.uleeSDK ? uleeSDK.showVideoAD(function () {
					e()
				}, function () { }) : e()
			}), utils.onBtnScaleEvent(utils.getChildDeep(this.img_item3, "btn_add3"), this, function () {
				var e = function () {
					s.getIns().addMaterial("touGu", 1), t.updateMaterials()
				};
				window.uleeSDK ? uleeSDK.showVideoAD(function () {
					e()
				}, function () { }) : e()
			}), utils.onBtnScaleEvent(utils.getChildDeep(this.img_item3, "btn_add4"), this, function () {
				var e = function () {
					s.getIns().addMaterial("ziYe", 1), t.updateMaterials()
				};
				window.uleeSDK ? uleeSDK.showVideoAD(function () {
					e()
				}, function () { }) : e()
			}), utils.onBtnScaleEvent(utils.getChildDeep(this.img_item3, "btn_he"), this, function (e) {
				return this.img_item3.isGet ? s.getIns().gold < 2e3 ? (utils.prompt("Insufficient Coin"), void audioManager.playSound(17, null, !1)) : dataManager.getWarehouseNum() ? void (this.player || (this.player = !0, s.getIns().addGold(-2e3), this.updateGold(), this.createEffect(function () {
					s.getIns().minusMaterial("suiGu", 5), s.getIns().minusMaterial("tuiGu", 3), s.getIns().minusMaterial("touGu", 1), s.getIns().minusMaterial("ziYe", 1), t.type = "da", Math.random() < .3 ? (t.randomDinosaur("da"), s.getIns().addDinosaurType("da", 1, t.getData.id), t.updateSuccessUI("da")) : Math.random() < .33 ? (t.randomDinosaur("zhong"), s.getIns().addDinosaurType("zhong", 1, t.getData.id), t.updateFailUI("zhong")) : Math.random() < .66 ? (t.randomDinosaur("xiao"), s.getIns().addDinosaurType("xiao", 1, t.getData.id), t.updateFailUI("xiao")) : (t.box_fail2.visible = !0, t.inAnim(t.box_fail2), audioManager.playSound(17, null, !1)), t.updateItem3(), t.updateMaterials(), t.player = !1
				}))) : (this.box_tag.visible = !0, void this.inAnim(this.box_tag)) : (utils.prompt("Insufficient Material"), void audioManager.playSound(17, null, !1))
			}), utils.onBtnScaleEvent(utils.getChildDeep(this.img_item3, "btn_get"), this, function (e) {
				if (!this.img_item3.isGet) return utils.prompt("Insufficient Material"), void audioManager.playSound(17, null, !1);
				if (!dataManager.getWarehouseNum()) return this.box_tag.visible = !0, void this.inAnim(this.box_tag);
				if (!this.player) {
					this.player = !0;
					var i = function () {
						s.getIns().minusMaterial("suiGu", 5), s.getIns().minusMaterial("tuiGu", 3), s.getIns().minusMaterial("touGu", 1), s.getIns().minusMaterial("ziYe", 1), t.randomDinosaur("da"), s.getIns().addDinosaurType("da", 1, t.getData.id), t.updateSuccessUI("da"), t.updateItem3(), t.updateMaterials(), t.player = !1
					};
					window.uleeSDK ? uleeSDK.showVideoAD(function () {
						t.createEffect(i), audioManager.huifuMusicMuted()
					}, function () {
						audioManager.huifuMusicMuted()
					}) : this.createEffect(i)
				}
			}), utils.onBtnScaleEvent(utils.getChildDeep(this.box_success, "btn_close"), this, function () {
				this.outAnim(this.box_success, function () {
					t.box_success.visible = !1
				})
			}), utils.onBtnScaleEvent(utils.getChildDeep(this.box_success, "btn_go"), this, function () {
				this.outAnim(this.box_success, function () {
					t.box_success.visible = !1, t.doClose(), uiManager.openUI("game/DinosaurView.scene")
				})
			}), utils.onBtnScaleEvent(utils.getChildDeep(this.box_fail, "btn_close"), this, function () {
				this.outAnim(this.box_success, function () {
					t.box_fail.visible = !1
				})
			}), utils.onBtnScaleEvent(utils.getChildDeep(this.box_fail, "btn_go"), this, function () {
				this.outAnim(this.box_success, function () {
					t.box_fail.visible = !1, t.doClose(), uiManager.openUI("game/DinosaurView.scene")
				})
			}), utils.onBtnScaleEvent(utils.getChildDeep(this.box_fail, "btn_reset"), this, function () {
				var e = function () {
					t.outAnim(t.box_success, function () {
						t.box_fail.visible = !1, t.randomDinosaur(t.type), s.getIns().addDinosaurType(t.type, 1, t.getData.id), t.updateSuccessUI(t.type), t.type = null
					})
				};
				window.uleeSDK ? uleeSDK.showVideoAD(function () {
					e(), audioManager.huifuMusicMuted()
				}, function () {
					audioManager.huifuMusicMuted()
				}) : e()
			}), utils.onBtnScaleEvent(utils.getChildDeep(this.box_fail2, "btn_close"), this, function () {
				this.outAnim(this.box_success, function () {
					t.box_fail2.visible = !1
				})
			}), utils.onBtnScaleEvent(utils.getChildDeep(this.box_fail2, "btn_go"), this, function () {
				this.outAnim(this.box_success, function () {
					t.box_fail2.visible = !1, t.doClose(), uiManager.openUI("game/DinosaurView.scene")
				})
			}), utils.onBtnScaleEvent(utils.getChildDeep(this.box_fail2, "btn_reset"), this, function () {
				var e = function () {
					t.box_fail2.visible = !1, t.randomDinosaur(t.type), s.getIns().addDinosaurType(t.type, 1, t.getData.id), t.updateSuccessUI(t.type), t.type = null
				};
				window.uleeSDK ? (audioManager.setMusicMuted(!1), uleeSDK.showVideoAD(function () {
					e(), audioManager.huifuMusicMuted()
				}, function () {
					audioManager.huifuMusicMuted()
				})) : e()
			}), utils.onBtnScaleEvent(utils.getChildDeep(this.box_tag, "btn_close"), this, function () {
				this.outAnim(this.box_tag, function () {
					t.box_tag.visible = !1
				})
			}), utils.onBtnScaleEvent(utils.getChildDeep(this.box_tag, "btn_go"), this, function () {
				this.outAnim(this.box_tag, function () {
					t.box_tag.visible = !1, t.doClose(), uiManager.openUI("game/DinosaurView.scene")
				})
			}), utils.onBtnScaleEvent(this.btn_select1, this, function () {
				this.player || (this.selectIndex = 0, this.updateUI(), this.updateBtn(this.btn_select1), this.img_item1.visible = !0, this.updateMaterials())
			}), utils.onBtnScaleEvent(this.btn_select2, this, function () {
				this.player || (this.selectIndex = 1, this.updateUI(), this.updateBtn(this.btn_select2), this.img_item2.visible = !0, this.updateMaterials())
			}), utils.onBtnScaleEvent(this.btn_select3, this, function () {
				this.player || (this.selectIndex = 2, this.updateUI(), this.updateBtn(this.btn_select3), this.img_item3.visible = !0, this.updateMaterials())
			})
		}
		updateGold() {
			utils.getChildDeep(this.box_coin, "label_num").text = s.getIns().gold;
			var t = utils.getChildDeep(this.img_item1, "label_gold"),
				e = utils.getChildDeep(this.img_item2, "label_gold"),
				i = utils.getChildDeep(this.img_item3, "label_gold");
			s.getIns().gold < 500 && this.img_item1.visible ? t.color = "#F84629" : t.color = "#fff", s.getIns().gold < 500 && this.img_item1.visible ? e.color = "#F84629" : e.color = "#fff", s.getIns().gold < 500 && this.img_item1.visible ? i.color = "#F84629" : i.color = "#fff"
		}
		updateUI() {
			this.img_item1.visible = !1, this.img_item2.visible = !1, this.img_item3.visible = !1, utils.getChildDeep(this.btn_select1, "on").visible = !1, utils.getChildDeep(this.btn_select1, "off").visible = !0, utils.getChildDeep(this.btn_select2, "on").visible = !1, utils.getChildDeep(this.btn_select2, "off").visible = !0, utils.getChildDeep(this.btn_select3, "on").visible = !1, utils.getChildDeep(this.btn_select3, "off").visible = !0
		}
		updateBtn(t) {
			utils.getChildDeep(t, "on").visible = !0
		}
		updateMaterials() {
			var t = dataManager.getMaterial("suiGu"),
				e = dataManager.getMaterial("tuiGu"),
				i = dataManager.getMaterial("touGu"),
				s = dataManager.getMaterial("lvYe"),
				a = dataManager.getMaterial("lanYe"),
				n = dataManager.getMaterial("ziYe");
			0 == this.selectIndex ? (utils.getChildDeep(this.img_item1, "btn_add1").visible = t < 1, utils.getChildDeep(this.img_item1, "btn_add2").visible = s < 1, this.updateItem1()) : 1 == this.selectIndex ? (utils.getChildDeep(this.img_item2, "btn_add1").visible = t < 3, utils.getChildDeep(this.img_item2, "btn_add2").visible = e < 1, utils.getChildDeep(this.img_item2, "btn_add3").visible = a < 1, this.updateItem2()) : 2 == this.selectIndex && (utils.getChildDeep(this.img_item3, "btn_add1").visible = t < 5, utils.getChildDeep(this.img_item3, "btn_add2").visible = e < 3, utils.getChildDeep(this.img_item3, "btn_add3").visible = i < 1, utils.getChildDeep(this.img_item3, "btn_add4").visible = n < 1, this.updateItem3())
		}
		updateItem1() {
			var t = utils.getChildDeep(this.img_item1, "item1"),
				e = utils.getChildDeep(t, "label_num"),
				i = utils.getChildDeep(this.img_item1, "item2"),
				s = utils.getChildDeep(i, "label_num"),
				a = dataManager.getMaterial("suiGu"),
				n = dataManager.getMaterial("lvYe");
			e.color = "#ffffff", s.color = "#ffffff", a < 1 && (e.color = "#ff423e"), n < 1 && (s.color = "#ff423e"), e.text = a + "/1", s.text = n + "/1", this.img_item1.isGet = a >= 1 && n >= 1
		}
		updateItem2() {
			var t = utils.getChildDeep(this.img_item2, "item1"),
				e = utils.getChildDeep(t, "label_num"),
				i = utils.getChildDeep(this.img_item2, "item2"),
				s = utils.getChildDeep(i, "label_num"),
				a = utils.getChildDeep(this.img_item2, "item3"),
				n = utils.getChildDeep(a, "label_num"),
				o = dataManager.getMaterial("suiGu"),
				r = dataManager.getMaterial("tuiGu"),
				l = dataManager.getMaterial("lanYe");
			e.color = "#ffffff", s.color = "#ffffff", n.color = "#ffffff", o < 3 && (e.color = "#ff423e"), r < 1 && (s.color = "#ff423e"), l < 1 && (n.color = "#ff423e"), e.text = o + "/3", s.text = r + "/1", n.text = l + "/1", this.img_item2.isGet = o >= 3 && r >= 1 && l >= 1
		}
		updateItem3() {
			var t = utils.getChildDeep(this.img_item3, "item1"),
				e = utils.getChildDeep(t, "label_num"),
				i = utils.getChildDeep(this.img_item3, "item2"),
				s = utils.getChildDeep(i, "label_num"),
				a = utils.getChildDeep(this.img_item3, "item3"),
				n = utils.getChildDeep(a, "label_num"),
				o = utils.getChildDeep(this.img_item3, "item4"),
				r = utils.getChildDeep(o, "label_num"),
				l = dataManager.getMaterial("suiGu"),
				h = dataManager.getMaterial("tuiGu"),
				d = dataManager.getMaterial("touGu"),
				c = dataManager.getMaterial("ziYe");
			e.color = "#ffffff", s.color = "#ffffff", n.color = "#ffffff", r.color = "#ffffff", l < 5 && (e.color = "#ff423e"), h < 3 && (s.color = "#ff423e"), d < 1 && (n.color = "#ff423e"), c < 1 && (r.color = "#ff423e"), e.text = l + "/5", s.text = h + "/3", n.text = d + "/1", r.text = c + "/1", this.img_item3.isGet = l >= 5 && h >= 3 && d >= 1 && c >= 1
		}
		updateSuccessUI(t) {
			this.box_success.visible = !0, this.inAnim(this.box_success, function () { }.bind(this)), audioManager.playSound(5, null, !1), utils.getChildDeep(this.box_success, "img_icon").skin = this.getData.icon
		}
		updateFailUI(t) {
			this.box_fail.visible = !0, this.inAnim(this.box_fail), audioManager.playSound(17, null, !1), utils.getChildDeep(this.box_fail, "img_icon").skin = this.getData.icon
		}
		randomDinosaur(t) {
			var e = [],
				i = [],
				s = [];
			for (var a in D.dinoConfig) 3 == D.dinoConfig[a].type ? e.push(D.dinoConfig[a]) : 2 == D.dinoConfig[a].type ? i.push(D.dinoConfig[a]) : 1 == D.dinoConfig[a].type && s.push(D.dinoConfig[a]);
			"xiao" == t ? this.getData = e[utils.random(0, e.length - 1)] : "zhong" == t ? this.getData = i[utils.random(0, i.length - 1)] : "da" == t && (this.getData = s[utils.random(0, s.length - 1)])
		}
		init3DScene() {
			this.newScene = this.addChild(new Laya.Scene3D), this.camera = cameraUtils.createCamera(new Laya.Vector3(0, 0, 30), new Laya.Vector3(0, 0, 0)), this.camera.orthographic = !0, this.camera.clearFlag = Laya.BaseCamera.CLEARFLAG_DEPTHONLY, this.camera.orthographicVerticalSize = 50, this.newScene.addChild(this.camera)
		}
		createEffect(t) {
			ModelCfg.getIns().getModelById(20011, function (e) {
				this.newScene.addChild(e), ModelCfg.getIns().setLocalPosition(e, 0, -1.5, 0), Laya.timer.once(2e3, this, function () {
					e.destroy(), t && t()
				})
			}.bind(this))
		}
		inAnim(t, e) {
			var i = utils.getChildDeep(t, "img_mask");
			i.visible = !0, i.alpha = 0, t.scaleX = 0, t.scaleY = 0;
			var s = new Laya.TimeLine;
			s.to(t, {
				scaleX: 1.2,
				scaleY: 1.2
			}, 100).to(t, {
				scaleX: 1,
				scaleY: 1
			}, 100).play(0, !1), s.on(Laya.Event.COMPLETE, this, function () {
				s.pause(), s.destroy()
			});
			var a = new Laya.TimeLine;
			a.to(i, {
				alpha: .8
			}, 300).play(0, !1), a.on(Laya.Event.COMPLETE, this, function () {
				a.pause(), a.destroy(), e && e()
			})
		}
		outAnim(t, e) {
			utils.getChildDeep(t, "img_mask").visible = !1;
			var i = new Laya.TimeLine;
			i.to(t, {
				scaleX: 1.2,
				scaleY: 1.2
			}, 100).to(t, {
				scaleX: 0,
				scaleY: 0
			}, 100).play(0, !1), i.on(Laya.Event.COMPLETE, this, function () {
				i.pause(), i.destroy(), e && e()
			})
		}
		doClose() {
			super.doClose(), G.MainUI.updateCoin(), window.uleeSDK && uleeSDK.showAD(!1)
		}
	}
	class X extends t {
		constructor() {
			super(), G.Tag = this
		}
		initData() { }
		initUI() { }
		initEvent() { }
		updateFont(t) {
			this.anim(function () {
				if (1 == t.toString().length) this.img_num2.visible = !1, this.img_dot.visible = !1, this.img_num1.skin = "common/img_" + t + ".png";
				else if (t.toString().length > 1) {
					var e = t.toString().split("");
					this.img_num2.visible = !0, this.img_dot.visible = !1, t.toString().indexOf(".") > -1 ? (this.img_dot.visible = !0, this.img_num1.skin = "common/img_" + e[0] + ".png", this.img_num2.skin = "common/img_" + e[2] + ".png") : (this.img_num1.skin = "common/img_" + e[0] + ".png", this.img_num2.skin = "common/img_" + e[1] + ".png")
				}
			}.bind(this))
		}
		anim(t) {
			var e = new Laya.TimeLine;
			e.to(this.box_info, {
				scaleX: 1.2,
				scaleY: 1.2
			}, 200).to(this.box_info, {
				scaleX: .8,
				scaleY: .8
			}, 100).to(this.box_info, {
				scaleX: 1,
				scaleY: 1
			}, 200).play(0, !1), e.on(Laya.Event.COMPLETE, this, function () {
				e.pause(), e.destroy(), t && t()
			})
		}
		doClose() {
			this.argObj && this.argObj.callback && this.argObj.callback(), super.doClose()
		}
	}
	class j extends t {
		constructor() {
			super(), G.TLUI = this
		}
		initData() { }
		initUI() {
			this.box_xy.visible = !1, this.box_add.visible = !1, this.btn_xy.visible = !s.getIns().WUXIAN, this.ani1.play(0, !0), this.updateTl(), this.check()
		}
		initEvent() {
			utils.onBtnScaleEvent(utils.getChildDeep(this.box_add, "btn_ad"), this, () => {
				var t = () => {
					s.getIns().setTl(s.getIns().TL + 10), utils.prompt("HP+10"), this.box_add.visible = !1, this.updateTl()
				};
				uleeSDK ? (audioManager.setMusicMuted(!1), uleeSDK.showVideoAD(() => {
					t(), audioManager.huifuMusicMuted()
				}, () => {
					audioManager.huifuMusicMuted()
				})) : t()
			}), utils.onBtnScaleEvent(utils.getChildDeep(this.box_add, "btn_get"), this, () => {
				s.getIns().setTl(s.getIns().TL + 5), utils.prompt("HP+5"), this.box_add.visible = !1, this.updateTl()
			}), utils.onBtnScaleEvent(this.btn_xy, this, () => {
				s.getIns().WUXIAN ? utils.prompt("Infinite physical play games today") : this.initXY()
			}), utils.onBtnScaleEvent(utils.getChildDeep(this.box_xy, "btn_close"), this, () => {
				this.box_xy.visible = !1
			}), utils.onBtnScaleEvent(utils.getChildDeep(this.box_xy, "btn_ad"), this, () => {
				let t = () => {
					s.getIns().setLook(s.getIns().LOOK + 1), s.getIns().LOOK >= 1 && s.getIns().setWuXian(!0), this.initXY(), this.doClose(), utils.prompt("Congratulations on getting unlimited strength today"), this.btn_xy.visible = !s.getIns().WUXIAN
				};
				uleeSDK ? (audioManager.setMusicMuted(!1), uleeSDK.showVideoAD(() => {
					t(), audioManager.huifuMusicMuted()
				}, () => {
					audioManager.huifuMusicMuted()
				})) : t()
			})
		}
		updateTl() {
			let t = utils.getChildDeep(this.box_info, "coin"),
				e = utils.getChildDeep(this.box_info, "tl");
			utils.getChildDeep(t, "num").text = s.getIns().COIN, utils.getChildDeep(e, "num").text = s.getIns().TL
		}
		initXY() {
			utils.getChildDeep(this.box_xy, "txt").text = "Watched(" + s.getIns().LOOK + " / 1)", this.box_xy.visible = !0
		}
		check() {
			s.getIns().TL < 5 && (this.box_add.visible = !0)
		}
		doClose() {
			G.TLUI = null, super.doClose()
		}
	}
	class W extends t {
		constructor() {
			super()
		}
		initData() {
			this.id = this.argObj.id
		}
		initUI() {
			this.ani1.play(0, !0), this.ani2.play(0, !0), this.ani3.play(0, !0), this.ani4.play(0, !0), this.initScene(), this.createModel()
		}
		initEvent() {
			var t = this;
			utils.onBtnScaleEvent(this.btn_close, this, function () {
				this.btn_tryout.click || this.doClose()
			}), utils.onBtnScaleEvent(this.btn_tryout, this, function () {
				this.btn_tryout.click || (this.btn_tryout.click = !0, uleeSDK ? (audioManager.setMusicMuted(!1), uleeSDK.showVideoAD(function () {
					s.getIns().setTryoutID(t.id), t.doClose(), t.btn_tryout.click = !1, audioManager.huifuMusicMuted(), Laya.timer.once(1e3, this, () => {
						audioManager.playMusic(1)
					})
				}, function () {
					t.btn_tryout.click = !1, audioManager.huifuMusicMuted(), Laya.timer.once(1e3, this, () => {
						audioManager.playMusic(1)
					})
				})) : (s.getIns().setTryoutID(this.id), this.doClose(), this.btn_tryout.click = !1))
			})
		}
		initScene() {
			this.newScene = this.box_scene.addChild(new Laya.Scene3D), this.camera = cameraUtils.createCamera(new Laya.Vector3(0, -3, 23), new Laya.Vector3(0, 0, 0), !1);
			var t = new Laya.DirectionLight;
			this.newScene.addChild(t), t.color = new Laya.Vector3(.6, .6, .6), this.newScene.addChild(this.camera), this.directionLight = this.newScene.addChild(new Laya.DirectionLight), this.directionLight.color = new Laya.Vector3(.5, .5, .5);
			var e = this.directionLight.transform.worldMatrix;
			e.setForward(new Laya.Vector3(-3, -5, -1)), this.directionLight.transform.worldMatrix = e
		}
		createModel() {
			var t = this;
			d.getIns().getModelById(D.gunConfig[this.argObj.id].modelid, function (e) {
				t.newScene.addChild(e), t.model = e, d.getIns().setLocalRotation(e, 30, 30, 0), updateManager.timeLoop(.01, t, function () {
					t.model.transform.localRotationEulerY += 1
				})
			})
		}
		doClose() {
			this.argObj && this.argObj.callback && this.argObj.callback(), super.doClose()
		}
	}
	class Z extends t {
		constructor() {
			super()
		}
		initData() {
			this.data = this.argObj.data
		}
		initUI() {
			this.ani1.play(0, !0), this.initScene(), this.createModel(), window.uleeSDK && "wx" == uleeSDK.pf && 1 == uleeSDK.gameConfig.touchMistake ? (this.btn_close.y = Laya.stage.height - 100, this.canTouch = !1) : this.canTouch = !0
		}
		initEvent() {
			var t = this;
			utils.onBtnScaleEvent(this.btn_close, this, function () {
				!this.canTouch && window.uleeSDK && "wx" == uleeSDK.pf && 1 == uleeSDK.gameConfig.touchMistake ? this.isClick || (this.isClick = !0, Laya.timer.once(1e3, this, function () {
					this.canTouch = !0, window.uleeSDK && uleeSDK.showAD(!0), this.btn_close.y = Laya.stage.height - 300
				})) : this.canTouch && this.doClose()
			}), utils.onBtnScaleEvent(this.btn_up, this, function () {
				var e = function () {
					s.getIns().addGoldSkin(t.data.id), s.getIns().setCurGoldSkin(t.data.id), t.doClose()
				};
				uleeSDK ? (audioManager.setMusicMuted(!1), uleeSDK.showVideoAD(function () {
					e(), audioManager.huifuMusicMuted()
				}, function () {
					audioManager.huifuMusicMuted()
				})) : e()
			})
		}
		initScene() {
			this.newScene = this.box_scene.addChild(new Laya.Scene3D), this.camera = cameraUtils.createCamera(new Laya.Vector3(0, -.5, 35), new Laya.Vector3(0, 0, 0), !1), this.newScene.addChild(this.camera), this.newScene.ambientColor = new Laya.Vector3(.8, .8, .8);
			var t = new Laya.DirectionLight;
			this.newScene.addChild(t), t.color = new Laya.Vector3(1, 1, 180 / 255), t.intensity = .9, t.transform.position = new Laya.Vector3(1.41, 10.65, -17.23), t.transform.rotationEuler = new Laya.Vector3(-45, 60, 0)
		}
		createModel() {
			var t = this;
			this.model && (this.model.destroy(), this.model = null), ModelCfg.getIns().getModelById(this.data.modelidG, function (e) {
				t.newScene.addChild(e), t.model = e, ModelCfg.getIns().setLocalRotation(e, 15, 100, 0), updateManager.timeLoop(.01, t, function () {
					t.model.transform.localRotationEulerY += 1
				})
			})
		}
		doClose() {
			this.argObj && this.argObj.callback && this.argObj.callback(), window.uleeSDK && uleeSDK.showAD(!1), super.doClose()
		}
	}
	class q extends t {
		constructor() {
			super(), G.v = this
		}
		initData() {
			this.gold = parseInt(this.argObj.gold * (1 + .2 * this.argObj.num)), -1 != this.gold.toString().indexOf(".") && (this.gold = Number(this.gold.toString().split(".")[0])), audioManager.stopMusic()
		}
		initUI() {
			this.updateCoin(), this.label_num.text = this.gold, this.label_num2.text = 3 * this.gold, s.getIns().levelup(), this.ani1.play(0, !1), this.ani1.on(Laya.Event.COMPLETE, this, function () {
				this.ani2.play(0, !0)
			}), window.uleeSDK && (uleeSDK.showInterstitialAD(() => { }), "wx" == uleeSDK.pf ? uleeSDK.showInterstitialAD() : "tt" == uleeSDK.pf && uleeSDK.showInterstitialAD(() => { }))
		}
		initEvent() {
			var t = this;
			utils.onBtnScaleEvent(this.btn_getAD, this, function (e) {
				this.btn_getAD.click || this.btn_next.click || (this.btn_getAD.click = !0, uleeSDK ? (audioManager.setMusicMuted(!1), uleeSDK.showVideoAD(function () {
					s.getIns().addGold(3 * t.gold), t.next(e), audioManager.huifuMusicMuted()
				}, function () {
					t.btn_getAD.click = !1, audioManager.huifuMusicMuted()
				})) : (s.getIns().addGold(3 * this.gold), this.next(e)))
			}), utils.onBtnScaleEvent(this.btn_next, this, function (t) {
				this.btn_getAD.click || this.btn_next.click || (this.btn_next.click = !0, s.getIns().addGold(this.gold), this.next(t))
			})
		}
		updateCoin() {
			this.label_gold.text = s.getIns().gold
		}
		next(t) {
			var e = this;
			utils.createCoinAnim2({
				x: t.stageX,
				y: t.stageY
			}, {
				x: this.box_coin.x,
				y: this.box_coin.y
			}, function () {
				e.updateCoin(), e.doClose()
			}, 20)
		}
		doClose() {
			super.doClose(), s.getIns().setTryoutID(0), G.BattleScript.clearModel(), G.BattleScript.initGame(), G.MainUI.updateUI(), G.MainUI.updateCoin(), G.MainUI.updateLv(), audioManager.playMusic(1)
		}
	}
	class $ {
		static init() {
			let t = Laya.ClassUtils.regClass;
			t("script/ui/BoxUI.js", a), t("script/ui/DefeatUI.js", n), t("script/ui/DialogView.js", o), t("script/ui/DinosaurUI.js", u), t("script/ui/GetTLView.js", p), t("script/ui/GuideUI.js", g), t("script/GameLoading.js", f), t("script/MainUI.js", y), t("script/battle/BattleScript2.js", U), t("script/ui/MiningUI.js", N), t("script/ui/OffLineUI.js", z), t("script/ui/ShareADUI.js", Y), t("script/ui/ShopUI.js", K), t("script/ui/StoryUI.js", F), t("script/ui/StudyUI.js", H), t("script/ui/TagUI.js", X), t("script/ui/TlUI.js", j), t("script/ui/TryoutUI.js", W), t("script/ui/UpGunUI.js", Z), t("script/ui/VictoryUI.js", q)
		}
	}
	$.width = 720, $.height = 1559, $.scaleMode = "showall", $.screenMode = "none", $.alignV = "top", $.alignH = "left", $.startScene = "game/LoadingView.scene", $.sceneRoot = "", $.debug = !1, $.stat = !1, $.physicsDebug = !1, $.exportSceneToJson = !0, $.init(), G.ENUM_LOOP_TYPE = {
		FRAME: 0,
		TIME: 1
	}, G.FRAME_INTERVAL = 0, G.NOW = Laya.Browser.now(), G.DELAYTIME = null, G.ADGUSTTIME = null, G.SERVER_FRAMETIME = null, Math.RAD_1_ANGLE = Math.PI / 180, Math.ANGLE_1_RAD = 180 / Math.PI, G.SCREEN_MODETYPE = {
		H: 0,
		V: 1
	}, G.SCREEN_MODE = G.SCREEN_MODETYPE.V, G.LOGIN_URL = "http://192.168.1.12:8080/bikeServer", G.SDKTYPE = null, G.ShareLimitTime = 2e3, G.COINPOS = {
		x: 0,
		y: 0
	}, G.PULLOUT_TRYOUTUI = !0, G.MAXTL = 10, G.MAXLV = 30, G.COINTIME = 360, G.GUNMODE = {
		SINGLE: 0,
		DOUBLE: 1
	}, G.DINO_STEP = {
		READY: 0,
		RUN: 1,
		ATTACK: 2,
		DEATH: 3,
		STAND: 4
	}, G.GAME_STEP = {
		IDLE: 0,
		READY: 1,
		START: 2,
		RUSH: 3,
		JUMP: 4,
		END: 5
	}, Array.prototype.pushAll = function (t) {
		if (t) {
			if (!(t instanceof Array)) throw new error("参数items必须为数组类型");
			for (var e = 0; e < t.length; e++) this.push(t[e])
		}
	}, Array.prototype.insert = function (t, e) {
		this.splice(t, 0, e)
	}, Array.prototype.remove = function (t) {
		for (var e = this.length - 1; e >= 0; e--) this[e] == t && this.splice(e, 1)
	}, Array.prototype.removeAt = function (t) {
		var e = this[t];
		return this.splice(t, 1), e
	}, Array.prototype.removeAll = function () {
		this.length = 0
	}, Array.prototype.contains = function (t) {
		return -1 != this.indexOf(t)
	}, Array.prototype.last = function () {
		return this[this.length - 1]
	}, Array.prototype.disposeArray = function () {
		if (this && 0 != this.length) {
			for (var t = this.length - 1; t >= 0; t--) this[t].dispose();
			this.removeAll()
		}
	}, Array.prototype.isEmpty = function () {
		return 0 == this.length
	}, G.clone = function (t) {
		if (null == t || "object" != typeof t) return t;
		if (t instanceof Date) return e.setTime(t.getTime()), e;
		if (t instanceof Array) {
			for (var e = [], i = 0; i < t.length; ++i) e[i] = G.clone(t[i]);
			return e
		}
		if (t instanceof Object) {
			for (var s in e = {}, t) t.hasOwnProperty(s) && (e[s] = G.clone(t[s]));
			return e
		}
		throw new Error("Unable to copy obj! Its type isn't supported.")
	}, Date.prototype.format = function (t) {
		var e = {
			"M+": this.getMonth() + 1,
			"d+": this.getDate(),
			"h+": this.getHours(),
			"m+": this.getMinutes(),
			"s+": this.getSeconds(),
			"q+": Math.floor((this.getMonth() + 3) / 3),
			"S+": this.getMilliseconds()
		};
		for (var i in /(y+)/i.test(t) && (t = t.replace(RegExp.$1, (this.getFullYear() + "").substr(4 - RegExp.$1.length))), e) new RegExp("(" + i + ")").test(t) && (t = t.replace(RegExp.$1, 1 == RegExp.$1.length ? e[i] : ("00" + e[i]).substr(("" + e[i]).length)));
		return t
	}, String.prototype.startWith = function (t) {
		var e = "^" + t,
			i = Pool.getItem(e, RegExp);
		null == i && (i = new RegExp(e));
		var s = i.test(this);
		return Pool.recover(e, i), s
	}, String.prototype.endWith = function (t) {
		var e = t + "$",
			i = Pool.getItem(e, RegExp);
		null == i && (i = new RegExp(e));
		var s = i.test(this);
		return Pool.recover(e, i), s
	}, String.prototype.replaceAll = function (t, e) {
		return this.split(t).join(e)
	}, G.resManager = {
		img: {}
	}, G.delResCount = function (t) {
		if (t)
			for (var e = G.resManager.img, i = 0; i < t.length; i++) {
				var s = t[i].url;
				e[s] -= 1, 0 == e[s] && G.clearRes(s)
			}
	}, G.clearRes = function (t) {
		Laya.loader.clearRes(t), t = laya.net.URL.formatURL(t), Laya.loader.clearRes(t)
	}, G.addResCount = function (t, e) {
		var i = G.resManager[t];
		i[e] ? i[e] += 1 : i[e] = 1
	}, G.copyProperties = function (t, e) {
		for (var i in t) e[i] = t[i]
	}, G.getLength = function (t) {
		var e = 0;
		for (var i in t) e++;
		return e
	}, Laya.Loader.cacheRes = function (t, e) {
		t = Laya.URL.formatURL(t), null != !Laya.Loader.loadedMap[t] && (Laya.Loader.loadedMap[t] = e)
	},
		function () {
			ulee.Utils = function () {
				this._pool = Laya.Pool
			}, (0, Laya.ClassUtils.regClass)(ulee.Utils, "ulee.Utils");
			var t = ulee.Utils.prototype;
			t.getColor = function (t) {
				return this.colorConfig[t]
			}, t.onBtnEvent = function (t, e, i) {
				null == t && console.log("控件不存在"), t.offAll(), t.on(Laya.Event.MOUSE_DOWN, e, function (t) {
					t.stopPropagation()
				}), t.on(Laya.Event.ROLL_OUT, e, function (t) {
					t.stopPropagation()
				}), t.on(Laya.Event.MOUSE_UP, e, function (t) {
					t.stopPropagation()
				}), t.on(Laya.Event.CLICK, e, function (t) {
					null != i && i.bind(e)(t), null != t.stopPropagation && t.stopPropagation()
				})
			}, t.offBtnEvent = function (t, e, i) {
				null == t && console.log("控件不存在"), t.off(Event.CLICK, e, i)
			}, t.onBtnScaleEvent = function (t, e, i, s) {
				null == t && console.log("控件不存在");
				var a = t.scaleX ? t.scaleX : 1,
					n = t.scaleY ? t.scaleY : 1;
				t.offAll(), t.anchorX = isNaN(t.anchorX) ? 0 : t.anchorX, t.anchorY = isNaN(t.anchorY) ? 0 : t.anchorY;
				var o = t.x + (.5 * t.width - t.width * t.anchorX),
					r = t.y + (.5 * t.height - t.height * t.anchorY);
				t.anchorX = .5, t.anchorY = .5, t.x = o, t.y = r, t.on(Laya.Event.MOUSE_DOWN, e, function (t) {
					audioManager.playSound(4, null, !0), t.target.scale(.9 * a, .9 * n), !s && t.stopPropagation()
				}), t.on(Laya.Event.ROLL_OUT, e, function (t) {
					t.currentTarget.scale(a, n), !s && t.stopPropagation()
				}), t.on(Laya.Event.MOUSE_UP, e, function (t) {
					t.target.scale(a, n), !s && t.stopPropagation()
				}), t.on(Laya.Event.CLICK, e, function (t) {
					null != i && i.bind(e)(t), null != t.stopPropagation && !s && t.stopPropagation()
				})
			}, t.getString = function (e, i) {
				if (!D.GameText[e]) return e + i;
				var s = D.GameText[e].chs;
				return s ? i ? t.stringFormat(s, i) : s : ""
			}, t.getLength = function (t) {
				return t.replace(/[\u0391-\uFFE5]/g, "aa").length
			}, t.stringFormat = function (t, e) {
				if (!t) return e;
				var i = t;
				if (e)
					for (var s = 0; s < e.length; s++) i = i.replaceAll("{" + s + "}", e[s]);
				return i
			}, t.setImgBlur = function (t, e) {
				if (t) {
					e = e || 5;
					var i = new Laya.BlurFilter;
					i.strength = e, t.filters = [i]
				}
			}, t.setImgGlow = function (t, e, i) {
				if (t) {
					i = i || 10, e = "#ffff00";
					var s = new Laya.GlowFilter(e, i, 0, 0);
					t.filters = [s]
				}
			}, t.setImgColor = function (t, e) {
				var i = new Laya.ColorFilter(e);
				t.filters = [i]
			}, t.clearFilters = function (t) {
				t.filters = []
			}, t.getChildDeep = function (t, e) {
				var i = t.getChildByName(e);
				if (i) return i;
				for (var s = 0; s < t._children.length; s++)
					if (i = utils.getChildDeep(t._children[s], e)) return i
			}, t.listSelectEx = function (t) {
				Laya.getset(0, t, "selectedIndex", function () {
					return this._selectedIndex
				}, function (t) {
					this._selectedIndex != t && (this._selectedIndex = t, this.changeSelectStatus(), this.event("change"), this.selectHandler && this.selectHandler.runWith([t, this.getCell(t), this]), this.startIndex = this._startIndex)
				})
			}, t.setHtmlLabel = function (t, e, i) {
				i || (t.style.fontSize = 24, t.style.font = "黑体", t.style.color = "#ffffff", t.style.align = "center"), t.innerHTML = utils.getString(e)
			}, t.setResUsed = function (t) {
				for (var e = 0; e < t.length; e++) G.addResCount("img", t[e].url)
			}, t.setResUnused = function (t) {
				for (var e = 0; e < t.length; e++) G.delResCount(t[e].url)
			}, t.getTimeLine = function (t) {
				var e = this,
					i = this._pool.getItemByClass("TimeLine", Laya.TimeLine);
				i.reset();
				var s = function () {
					i.off(Laya.Event.COMPLETE, this, s), e._pool.recover("TimeLine", i), t && t.run()
				};
				return i.on(Laya.Event.COMPLETE, this, s), i
			}, t.transPos = function (t, e) {
				var i = new Laya.Point;
				return t.localToGlobal(i), e.globalToLocal(i, !0)
			}, t.prompt = function (t) {
				t && (this.m_systemPrompt || (this.m_systemPrompt = window.promptUtils, this.m_systemPrompt.init()), this.m_systemPrompt.showTime = G.NOW, this.m_systemPrompt.prompt(t))
			}, t.movePrompt = function (t) { }, t.promptImg = function (t) {
				t && (this.m_systemPrompt || (this.m_systemPrompt = uiManager.openUI(ulee.Prompt)), this.m_systemPrompt.prompt1(t))
			}, t.sendParamHttp = function (t, e, i) {
				var s = new Laya.HttpRequest;
				s._loadedSize = 0, s._totalSize = 5e6, s.once(Laya.Event.COMPLETE, this, this.onHttpCompelete, [s, i]);
				for (key in e) t += this.stringFormat("&{0}={1}", [key, e[key]]);
				s.send(t, null, "get", "text")
			}, t.onHttpCompelete = function (t, e) {
				e && e.runWith(t.data)
			}, t.formatTime = function (t, e) {
				var i = Math.floor(t / 60);
				if (t %= 60, !e || i < 60) return utils.timeNumberFormat(i) + ":" + utils.timeNumberFormat(t);
				var s = Math.floor(i / 60);
				return i %= 60, s + ":" + utils.timeNumberFormat(i) + ":" + utils.timeNumberFormat(t)
			}, t.timeNumberFormat = function (t) {
				return (t < 10 ? "0" : "") + parseInt(t)
			}, t.updateCircleHead = function (t) {
				var e = new Laya.Sprite;
				e.graphics.drawCircle(t.width / 2, t.width / 2, t.width / 2, "#ffff00"), e.pos(0, 0), t.mask = e
			}, t.listSelectEx = function (t) {
				Laya.getset(0, t, "selectedIndex", function () {
					return this._selectedIndex
				}, function (t) {
					this._selectedIndex != t && (this._selectedIndex = t, this.changeSelectStatus(), this.event("change"), this.selectHandler && this.selectHandler.runWith([t, this.getCell(t), this]), this.startIndex = this._startIndex)
				})
			}, t.listHandler = function (t, e, i, s) {
				t && (i && (t.renderHandler = new Handler(e, i.bind(e))), s && (t.selectHandler = new Handler(e, s.bind(e))), t.scrollBar && (t.scrollBar.visible = !1), t.selectEnable = !0)
			}, t.cutstr = function (t, e) {
				for (var i = "", s = 0; s < t.length; s++)
					if (i += t[s], s + 1 == e) {
						i += "...";
						break
					} return i
			}, t.setVector3 = function (t, e, i, s) {
				t.x = e, t.y = i, t.z = s
			}, t.getImgUrl = function (t) {
				if (t) {
					try {
						imgUrl = D.SpritePath[t].chs
					} catch (e) {
						console.error("找不到图片资源,id:" + t + "/使用临时资源替换"), imgUrl = D.SpritePath[100].chs
					}
					return imgUrl
				}
			}, t.rayCast = function (t, e, i) {
				for (var s = new Laya.RaycastHit, a = 0, n = e.length; a < n; a++) {
					var o = e[a];
					if (o.enable && (o.raycast(t, s, i), -1 !== s.distance)) return !0
				}
			}, t.getYearWeek = function (t, e, i) {
				var s = new Date(t, parseInt(e) - 1, i),
					a = new Date(t, 0, 1),
					n = Math.round((s.valueOf() - a.valueOf()) / 864e5);
				return Math.ceil((n + (a.getDay() + 1 - 1)) / 7)
			}, t.gameCoinAnimation = function (t, e, i, s, a, n) {
				this.timeLineArr = [];
				var o = 5;
				1 == e ? (o = t) > 25 && (o = 25) : t > 1e6 ? o = 30 : t > 1e5 ? o = 20 : t > 1e4 && (o = 10);
				var r = new Laya.FontClip("fnt/number1.png", "1234567890");
				r.x = i.x + 50, r.y = i.y + 18, r.alpha = 0, r.value = t, r.scale(0, 0), r.anchorX = .5, r.anchorY = .5, a.addChild(r);
				var l = new Laya.TimeLine;
				l.name = "moneyAni", this.timeLineArr.push(l), l.to(r, {
					scaleX: .4,
					scaleY: .4,
					alpha: 1
				}, 300).to(r, {
					scaleX: .2,
					scaleY: .2,
					alpha: 0
				}, 400, null, 600), l.on(Laya.Event.COMPLETE, this, function () {
					n && n(), r.destroy()
				});
				for (var h = !1, d = 0; d < o; d++) this.createCoin(e, s, a, function (t) {
					var e = new Laya.TimeLine;
					this.timeLineArr.push(e), e.to(t, {
						x: i.x,
						y: i.y
					}, this.random(100, 400), Laya.Ease.backIn, 0), d == o && e.play(-300, !1), e.on(Laya.Event.COMPLETE, this, function () {
						t.removeSelf(), h || (h = !0, l.play(0, !1))
					})
				}.bind(this))
			}, t.createCoin = function (t, e, i, s) {
				var a = new Laya.Image;
				1 == t ? a.skin = "common/img_diamond.png" : 2 == t && (a.skin = "common/img_coin.png"), a.x = e.x, a.y = e.y, a.scale(0, 0), i.addChild(a);
				var n = new Laya.TimeLine;
				n.name = "coin", this.timeLineArr.push(n);
				var o = a.x + this.random(0, 230),
					r = a.y + this.random(-100, 100);
				n.addLabel("move", 0).to(a, {
					scaleX: .8,
					scaleY: .8,
					x: o,
					y: r
				}, 100, Laya.Ease.backOut, 0).play(100, !1), n.on(Laya.Event.COMPLETE, this, function () {
					s && s(a)
				})
			}, t.clearGameCoinAnimation = function () {
				if (!(null == this.timeLineArr || this.timeLineArr.length <= 0))
					for (var t = 0; t < this.timeLineArr.length; t++) {
						var e = this.timeLineArr[t];
						e.name = "", e.pause(), e.destroy(), e = null
					}
			}, t.checkPrompt = function () {
				!G.ISSHOWSIGN && dataManager.getUserData("isCanSign") ? (G.ISSHOWSIGN = !0, updateManager.timeOnce(.5, this, function () {
					uiManager.openUI("game/SignInUI.scene")
				})) : !G.ISTURNTABLE && dataManager.getUserData("turntableFreeTimes") > 0 && (G.ISTURNTABLE = !0, updateManager.timeOnce(.5, this, function () {
					uiManager.openUI("game/LuckyTurntableView.scene")
				}))
			}, t.create3DFont = function (t, e, i) {
				var s = new Laya.MeshSprite3D(Laya.PrimitiveMesh.createPlane(1, 1));
				s.transform.rotate(new Laya.Vector3(90, 0, 0), !0, !0), s.transform.localPosition = new Laya.Vector3(0, 1.05, 0), t.addChild(s);
				var a = new Laya.UnlitMaterial;
				s.meshRenderer.sharedMaterial = a;
				var n = Laya.Browser.createElement("canvas");
				n.width = 200, n.height = 200;
				var o = n.getContext("2d"),
					r = new Image;
				r.src = "models/obj/obj_texture/img_bubble.png";
				var l = this;
				return r.onload = function () {
					o.drawImage(r, 0, 0, 200, 120), o.fillStyle = i || "rgb(255，255，255)", o.font = "bold 35px 微软雅黑", o.textAlign = "left", o.textBaseline = "middle", l.drawText(o, e, 15, 5, 150);
					var t = new Laya.Texture2D(120, 75);
					t.loadImageSource(n), a.renderMode = Laya.UnlitMaterial.RENDERMODE_TRANSPARENT, a.albedoTexture = t, s.meshRenderer.sharedMaterial.cull = Laya.RenderState.CULL_NONE
				}, s
			}, t.randomSlogan = function () {
				for (; ;) {
					var t = this.random(1, 10);
					if ((!this.oldArr || null == this.oldArr || Object.keys(this.oldArr).length >= Object.keys(this.sloganMap).length) && (this.sloganMap = D.sloganConfig, this.oldArr = {}), null == this.oldArr[this.sloganMap[t].id]) return this.oldArr[this.sloganMap[t].id] = this.sloganMap[t], this.sloganMap[t].content
				}
			}, t.crateView = function (t, e, i) {
				i || console.error("未传回调函数"), Laya.loader.create(t, Laya.Handler.create(this, function (t) {
					let s = new Laya.View;
					s.createView(t), i.bind(e)(s)
				}))
			}, t.random = function (t, e) {
				return Math.floor(Math.random() * (e + 1 - t) + t)
			}, t.setSlotSkin = function (t, e, i) {
				Laya.loader.load([i], Laya.Handler.create(this, function () {
					var s = Laya.loader.getRes(i);
					t.setSlotSkin(e, s)
				}))
			}, t.changeDBSkin = function (t, e) {
				let i = t._boneSlotDic;
				for (let s in i) {
					let a = i[s].srcDisplayIndex;
					t.replaceSlotSkinByIndex(s, a, e)
				}
			}, t.createCoinAnim = function (t, e, i) {
				audioManager.playSound(10);
				for (var s = [], a = 0, n = 0; n < 12; n++) a += 5, s.push(a);
				var o = [];
				for (let a = 0; a < 12; a++) {
					var r = t.x,
						l = t.y,
						h = 2 * Math.PI / 360 * 6 * s[a],
						d = r + 100 * Math.sin(h),
						c = l - 100 * Math.cos(h),
						u = new Laya.Image("common/img_coin.png");
					u.x = r, u.y = l - u.height / 2, u.width = 54, u.height = 56, Laya.stage.addChild(u), o.push(u);
					let n = new Laya.TimeLine;
					n.to(u, {
						x: d,
						y: c
					}, 100 + 10 * a).play(0, !1), n.on(Laya.Event.COMPLETE, this, function () {
						n.pause(), n.destroy(), 11 == a && updateManager.timeOnce(.3, this, function () {
							for (let t = 0; t < o.length; t++) {
								let s = o[t],
									a = new Laya.TimeLine;
								a.to(s, {
									x: e.x,
									y: e.y
								}, 300 + parseInt(300 * Math.random())).play(0, !1), a.on(Laya.Event.COMPLETE, this, function () {
									a.pause(), a.destroy(), s.destroy(), audioManager.playSound(11), t == o.length - 1 && updateManager.timeOnce(.5, this, function () {
										i && i()
									})
								})
							}
						})
					})
				}
			}, t.createCoinAnim2 = function (t, e, i, s) {
				audioManager.playSound(10);
				var a = [];
				for (let d = 0; d < s; d++) {
					var n = t.x,
						o = t.y,
						r = n + utils.random(-50, 50),
						l = o + utils.random(-50, 50),
						h = new Laya.Image("common/img_coin.png");
					h.x = n, h.y = o - h.height / 2, h.width = 54, h.height = 56, h.zOrder = 1e5, Laya.stage.addChild(h), a.push(h);
					let c = new Laya.TimeLine;
					c.to(h, {
						x: r,
						y: l
					}, 100 + 10 * d).play(0, !1), c.on(Laya.Event.COMPLETE, this, function () {
						c.pause(), c.destroy(), d == s - 1 && updateManager.timeOnce(.3, this, function () {
							for (let t = 0; t < a.length; t++) {
								let s = a[t],
									n = new Laya.TimeLine;
								n.to(s, {
									x: e.x,
									y: e.y
								}, 300 + parseInt(300 * Math.random())).play(0, !1), n.on(Laya.Event.COMPLETE, this, function () {
									n.pause(), n.destroy(), s.destroy(), audioManager.playSound(11), t == a.length - 1 && updateManager.timeOnce(.5, this, function () {
										i && i()
									})
								})
							}
						})
					})
				}
			}
		}(), window.utils = new ulee.Utils, ulee.Event = {}, ulee.Event.ON_DATA_LOAD = 1e3, ulee.Event.ON_CHANGE_GOLD = 1001, ulee.Event.ON_SIGN = 1002, ulee.Event.ON_CHECK_SHOP_RED = 1003, ulee.Event.ON_TURNTABLE = 1004, ulee.Event.ON_GET_WEAPON = 1005,
		function () {
			ulee.CameraUtils = function () {
				this.upPos = new Laya.Vector3(0, 1, 0), this.tempVec3 = new Laya.Vector3(0, 0, 0), this.posVec3 = new Laya.Vector3(4, 4, 4), this.angleA = 90, this.angleB = -70, this.r = 10
			}, (0, Laya.ClassUtils.regClass)("ulee.CameraUtils", ulee.CameraUtils);
			var t = ulee.CameraUtils.prototype;
			t.createCamera = function (t, e, i) {
				let s = new Laya.Camera(0, .1, 1e3);
				return t && s.transform.translate(t), e && s.transform.rotate(e, !0, !1), i || (s.clearFlag = Laya.BaseCamera.CLEARFLAG_DEPTHONLY), s
			}, t.controlCamera = function (t) {
				t.addComponent(V)
			}, t.setTarget = function (t, e) {
				this.camera = e, this.m_Target = t
			}, t.FollowTarget = function (t) {
				null != this.m_Target && (Laya.Vector3.lerp(this.camera.transform.position, this.m_Target.transform.position, t, this.tempVec3), this.tempVec3.y += this.posVec3.x, this.tempVec3.z += this.posVec3.y, this.tempVec3.x += this.posVec3.z, this.camera.transform.position = this.tempVec3, this.r = Laya.Vector3.distance(this.camera.transform.position, this.m_Target.transform.position), this.camera.transform.lookAt(this.m_Target.transform.position, this.upPos))
			}, t.setPos = function (t, e, i) {
				this.posVec3.x = t, this.posVec3.y = e, this.posVec3.z = i
			}, t.LookAtTarget = function () {
				this.camera.transform.lookAt(this.m_Target.transform.position, this.upPos)
			}, t.HandleRotateMovement = function (t) {
				if (this.camera && this.m_Target) {
					this.angleA += t.x / 10, this.angleB -= t.y / 10;
					var e = this.camera.transform.position;
					e.x = this.r * Math.sin(this.angleB * Math.RAD_1_ANGLE) * Math.sin(this.angleA * Math.RAD_1_ANGLE) + this.m_Target.transform.position.x, e.y = this.r * Math.cos(this.angleB * Math.RAD_1_ANGLE) + this.m_Target.transform.position.y, e.z = this.r * Math.sin(this.angleB * Math.RAD_1_ANGLE) * Math.cos(this.angleA * Math.RAD_1_ANGLE) + this.m_Target.transform.position.z, this.camera.transform.position = e, this.camera.transform.lookAt(this.m_Target.transform.position, this.upPos)
				}
			}, t.setTargetR = function (t) {
				let e = Math.abs(t - this.r) / .015;
				this.timeline = utils.getTimeLine(Handler.create(this, function () {
					this.timeline = null
				})), this.timeline.to(this, {
					r: t
				}, e, null, 0).play(0, !1)
			}, t.stopR = function () {
				this.timeline && (this.timeline.pause(), this.timeline.destroy(), this.timeline = null)
			}, t.setAngle = function (t, e, i, s) {
				if (this.bkAngleA != t || this.bkAngleB != e) {
					i = i || 5e3, utils.getTimeLine(Handler.create(this, function () {
						this.can = !1, s && s()
					})).to(this, {
						angleA: t,
						angleB: e
					}, i, null, 0).play(0, !1), this.bkAngleA = t, this.bkAngleB = e
				}
			}
		}(), window.cameraUtils = new ulee.CameraUtils,
		function (t) {
			ulee.EventDispatcher = function () {
				this.eventDispatcher = new Laya.EventDispatcher
			}, (0, Laya.ClassUtils.regClass)(ulee.EventDispatcher, "ulee.EventDispatcher", void 0);
			var e = ulee.EventDispatcher.prototype;
			e.addEventListen = function (t, e, i) {
				this.eventDispatcher.on(t, e, i)
			}, e.removeEventListen = function (t, e, i) {
				this.eventDispatcher.off(t, e, i)
			}, e.dispatchEvent = function (t, e) {
				var i = {
					msg: e,
					name: t
				};
				this.eventDispatcher.event(t, i), i = null
			}
		}(), window.eventDispatcher = new ulee.EventDispatcher,
		function () {
			ulee.io.DataInputStream = function (t) {
				this.arrayBuffer = t, this.index = 0, this.dv = new DataView(this.arrayBuffer)
			}, (0, Laya.ClassUtils.regClass)(ulee.io.DataInputStream, "ulee.io.DataInputStream");
			var t = ulee.io.DataInputStream.prototype;
			t.readByte = function () {
				return this.dv.getInt8(this.index++)
			}, t.readShort = function () {
				var t = this.dv.getInt16(this.index);
				return this.index += 2, t
			}, t.readInt = function () {
				var t = this.dv.getInt32(this.index);
				return this.index += 4, t
			}, t.readUint = function () {
				var t = this.dv.getUint32(this.index);
				return this.index += 4, t
			}, t.readLong = function () {
				var t = this.readInt(),
					e = this.readUint();
				return t * Math.POW_2_32 + e
			}, t.readFloat = function () {
				var t = this.dv.getFloat32(this.index);
				return this.index += 4, t
			}, t.readUTF = function () {
				var t = this.readShort();
				return this.readText(t)
			}, t.readText = function (t) {
				for (var e = this.arrayBuffer.slice(this.index, this.index + t), i = new Uint8Array(e), s = "", a = t, n = 0, o = String.fromCharCode, r = 0, l = i; r < a;)(n = l[r++]) < 128 ? 0 != n && (s += o(n)) : s += o(n < 224 ? (63 & n) << 6 | 127 & l[r++] : n < 240 ? (31 & n) << 12 | (127 & l[r++]) << 6 | 127 & l[r++] : (15 & n) << 18 | (127 & l[r++]) << 12 | l[r++] << 6 & 127 | 127 & l[r++]), 0;
				return this.index += t, s
			}, t.readArrayBuffer = function (t) {
				var e = this.arrayBuffer.slice(this.index, this.index + t);
				return this.index += t, e
			}
		}(),
		function () {
			ulee.ListHeightVariable = function () { }, (0, Laya.ClassUtils.regClass)(ulee.ListHeightVariable, "ulee.ListHeightVariable");
			ulee.ListHeightVariable.prototype;
			ulee.ListHeightVariable.Convert = function (t) {
				t.$renderItems = t.renderItems, t._ys = [0], t.renderItems = function () {
					for (var e = 0, i = t._cells.length; e < i; e++) t.renderItem(t._cells[e], t._startIndex + e);
					t.changeSelectStatus()
				}, t.$renderItem = t.renderItem, t.renderItem = function (e, i) {
					if (t.$renderItem(e, i), e.y = t._ys[i], t._ys.length === i + 1 && i < t.array.length) {
						var s = e.y + e.height;
						t._ys.push(s), t._scrollBar.setScroll(0, s - t._content.height, t._scrollBar.value)
					}
				}, t.$onScrollBarChange = t.onScrollBarChange, t.onScrollBarChange = function (e) {
					t.runCallLater(t.changeCells);
					var i, s = t._scrollBar.value,
						a = t.repeatY,
						n = 0;
					for (i = 0; i < t._ys.length && !(t._ys[i] > s); i++) n = i;
					if (n > t._startIndex) {
						var o = n - t._startIndex,
							r = !0,
							l = t._startIndex + 1 * (a + 1);
						t._isMoved = !0
					} else n < t._startIndex && (o = t._startIndex - n, r = !1, l = t._startIndex - 1, t._isMoved = !0);
					for (i = 0; i < o; i++) {
						if (r) {
							var h = t._cells.shift();
							t._cells[t._cells.length] = h;
							var d = l + i
						} else h = t._cells.pop(), t._cells.unshift(h), d = l - i;
						t.renderItem(h, d)
					}
					t._startIndex = n, t._content.scrollRect.y = s
				}, t.$posCell = t.posCell, t.posCell = function (e, i) {
					t._scrollBar && (e.y = t._ys[i])
				}, t.$changeCells = t.changeCells, t.changeCells = function () {
					if (t._cellChanged = !1, t._itemRender) {
						t.scrollBar = this.getChildByName("scrollBar");
						var e = this._getOneCell(),
							i = e.width + this._spaceX || 1,
							s = e.height + this._spaceY || 1;
						this._width > 0 && (this._repeatX2 = this._isVertical ? Math.round(this._width / i) : Math.ceil(this._width / i)), this._height > 0 && (this._repeatY2 = this._isVertical ? Math.ceil(this._height / s) : Math.round(this._height / s));
						var a = this._width ? this._width : i * this.repeatX - this._spaceX,
							n = this._height ? this._height : s * this.repeatY - this._spaceY;
						this._cellSize = this._isVertical ? s : i, this._cellOffset = this._isVertical ? s * Math.max(this._repeatY2, this._repeatY) - n - this._spaceY : i * Math.max(this._repeatX2, this._repeatX) - a - this._spaceX, this._isVertical && this._scrollBar ? this._scrollBar.height = n : !this._isVertical && this._scrollBar && (this._scrollBar.width = a), this.setContentSize(a, n);
						var o = this._isVertical ? this.repeatX : this.repeatY,
							r = (this._isVertical ? this.repeatY : this.repeatX) + (this._scrollBar ? 1 : 0);
						this._createItems(0, o, r), this._createdLine = r, this._array && (this.array = this._array, this.runCallLater(this.renderItems))
					}
				}, Laya.getset(0, t, "array", function () {
					return this._array
				}, function (e) {
					this.runCallLater(this.changeCells), this._array = e || [];
					var i = this._array.length;
					if (this.totalPage = Math.ceil(i / (this.repeatX * this.repeatY)), this._selectedIndex = this._selectedIndex < i ? this._selectedIndex : i - 1, this.startIndex = this._startIndex, this._scrollBar) {
						this._scrollBar.stopScroll();
						var s = this._isVertical ? this.repeatX : this.repeatY,
							a = this._isVertical ? this.repeatY : this.repeatX,
							n = Math.ceil(i / s);
						(this._cellOffset > 0 ? this.totalPage + 1 : this.totalPage) > 1 ? (this._scrollBar.scrollSize = this._cellSize, this._scrollBar.thumbPercent = a / n, this._scrollBar.setScroll(0, this._ys[this._ys.length - 1] - t._content.height, this._scrollBar.value), this._scrollBar.target = this._content) : (this._scrollBar.setScroll(0, 0, 0), this._scrollBar.target = this._content)
					}
				}), t.tweenTo = function (e, i, s) {
					if (void 0 === i && (i = 200), t._scrollBar) {
						var a = t._ys[e];
						Tween.to(t._scrollBar, {
							value: a
						}, i, null, s, 0, !0)
					} else t.startIndex = e, s && s.run()
				}, t._scrollBar && (t._scrollBar.off("change", t, t.$onScrollBarChange), t._scrollBar.on("change", t, t.onScrollBarChange))
			}
		}(),
		function () {
			ulee.Model = function (t, e, i) {
				this._modelId = 0, this._sprite = null, this.animator = null, this.avater = null, this._canimators = [], this._parent = null, this._addModels = [], this._bones = {}, this._loadedHandler = null, this._localPosition = new Vector3(0, 0, 0), this._localScale = new Vector3(1, 1, 1), this._localRotation = new Vector3(0, 0, 0), this._localRotation2 = new Vector3(0, 0, 0), this.loaded = !1, this._active = !0, this.modelConfig = null, this._alpha = 1, e && this.create(t, e, i)
			}, (0, Laya.ClassUtils.regClass)(ulee.Model, "ulee.Model");
			var t = ulee.Model.prototype;
			ulee.Model.create = function (t, e, i) {
				var s = Laya.Pool.getItem("ccModel");
				return s ? s.create(t, e, i) : s = new ulee.Model(t, e, i), s
			}, t.prepareLoad = function (t) {
				Laya.loader.create(t, Laya.Handler.create(this, this.LoadResComplete))
			}, t.create = function (t, e, i) {
				this._parent = t, this._modelId = e, this._loadedHandler = i, this._isDestroyed = !1, this._config = D.PrefabsPath[e];
				var s = this._config.chs;
				this.url = ulee.Model.fullChs(s), this.name = s.substring(s.lastIndexOf("/") + 1), this.prepareLoad(this.url)
			}, ulee.Model.fullChs = function (t) {
				var e = t.substring(t.lastIndexOf("/") + 1);
				return t + "/" + e + ".lh"
			}, t.LoadResComplete = function () {
				if (!this._isDestroyed) {
					var t = Laya.Loader.getRes(this.url);
					this._sprite = Laya.Sprite3D.instantiate(t), this._sprite.$model = this, this._sprite.$name = "Model_" + this._modelId, this.avater = this._sprite.getChildAt(0), this.animator = this.avater.getComponent(Laya.Animator);
					for (var e = 0; e < this._config.subModel.length; e++) {
						var i = this._config.subModel[e];
						if ("0" == i) break;
						var s = this.avater.getChildByName(i);
						if (s) {
							var a = s.getComponentByType(Laya.Animator);
							a && this._canimators.push(a)
						}
					}
					Laya.timer.once(1, this, this._onAllCompleted)
				}
			}, t.setLocalPosition = function (t, e, i) {
				utils.setVector3(this._localPosition, t, e, i), this.loaded && (this._sprite.transform.localPosition = this._localPosition)
			}, t.setLocalScale = function (t, e, i) {
				void 0 === t && (t = 1), void 0 === e && (e = t), void 0 === i && (i = t), utils.setVector3(this._localScale, t, e, i), this.loaded && (this._sprite.transform.localScale = this._localScale)
			}, t.setLocalRotation = function (t, e, i, s) {
				s || (s = this._sprite), this._localRotation2.x = t, this._localRotation2.y = e, this._localRotation2.z = i, utils.setVector3(this._localRotation, t * Math.RAD_1_ANGLE, e * Math.RAD_1_ANGLE, i * Math.RAD_1_ANGLE);
				var a = s.transform;
				Laya.Quaternion.createFromYawPitchRoll(this._localRotation.x, this._localRotation.y, this._localRotation.z, a._localRotation), a.localRotation = a._localRotation
			}, t.setActive = function (t) {
				this._active != t && (this._active = t, this.loaded && (this._sprite.active = t))
			}, t.isActive = function () {
				return this._active
			}, t.setAlpha = function (t) {
				this._alpha != t && (this.setAlalbedo(this._sprite, t, 1, 1, 1), this._alpha = t)
			}, t._setRenderMode = function (t, e) {
				e || (e = this._sprite);
				var i = e.meshRenderer || e.skinnedMeshRenderer || e.particleRenderer || e.ShurikenParticleRenderer;
				if (i) i.material && (i.material.renderMode = t);
				else {
					for (var s = 0; s < e.numChildren; s++) {
						var a = e.getChildAt(s);
						this._setRenderMode(t, a)
					}
					this.renderMode = t
				}
			}, t.setAlalbedo = function (t, e, i, s, a) {
				if (t) {
					var n = t.meshRenderer || t.skinnedMeshRenderer;
					if (n)
						for (var o = n.materials, r = o.length - 1; r >= 0; r--) {
							var l = o[r];
							0 == l.cull && 1 == l.blend && 770 == l.srcBlend && 1 == l.dstBlend || (e < 1 && (l.renderMode = Laya[l.constructor.name].RENDERMODE_TRANSPARENT), l.albedoColorA = e, l.albedoColorR = i, l.albedoColorG = s, l.albedoColorB = a)
						} else
						for (var h = 0; h < t.numChildren; h++) {
							var d = t.getChildAt(h);
							this.setAlalbedo(d, e, i, s, a)
						}
				}
			}, t.setIntensity = function (t, e) {
				if (t) {
					var i = t.meshRenderer || t.skinnedMeshRenderer;
					if (i)
						for (var s = i.materials, a = s.length - 1; a >= 0; a--) {
							s[a].albedoIntensity = e
						} else
						for (var n = 0; n < t.numChildren; n++) {
							var o = t.getChildAt(n);
							this.setIntensity(o, e)
						}
				}
			}, t.receiveShadow = function () {
				for (var t = 0; t < this._sprite.numChildren; t++) {
					var e = this._sprite.getChildAt(t);
					e instanceof Laya.MeshSprite3D ? e.meshRender.receiveShadow = !0 : e instanceof Laya.SkinnedMeshSprite3D && (e.skinnedMeshRender.receiveShadow = !0)
				}
			}, t.showShashow = function (t, e) {
				e = null == e || e;
				for (var i = 0; i < t.numChildren; i++) {
					var s = t.getChildAt(i);
					s instanceof Laya.MeshSprite3D ? s.meshRender.castShadow = e : s instanceof Laya.SkinnedMeshSprite3D && (s.skinnedMeshRender.castShadow = e), s.numChildren > 0 && this.showShashow(s, e)
				}
			}, t.rotate = function (t, e, i) {
				this.loaded && this._sprite.transform.rotate(t, e, i)
			}, t._onLoadedModel = function (t) {
				if (!this._isDestroyed) {
					this._sprite = Laya.Sprite3D.instantiate(t), this.avater = this._sprite.getChildAt(0), this.animator = this.avater.getComponentByType(Laya.Animator);
					for (var e = 0; e < this._config.subModel.length; e++) {
						var i = this._config.subModel[e];
						if ("0" == i) break;
						var s = this.avater.getChildByName(i);
						if (s) {
							var a = s.getComponentByType(Laya.Animator);
							a && this._canimators.push(a)
						}
					}
					this._loadAdds()
				}
			}, t._loadAdds = function () {
				this._isDestroyed || (this._addLoadIndex >= this._adds.length ? this._onAllCompleted() : this._addModels.push(ulee.Model.create(void 0, this._adds[this._addLoadIndex][0], Laya.Handler.create(this, this.onAddLoaded))))
			}, t.onAddLoaded = function () {
				if (!this._isDestroyed) {
					var t = this._addModels.last(),
						e = this._adds[this._addLoadIndex][1];
					this.bindBone(e, t._sprite), this._addLoadIndex++, this._loadAdds()
				}
			}, t._onAllCompleted = function () {
				this.loaded = !0, this._isDestroyed || (this._waitDestroy ? this.dispose() : (this._parent && this._parent.addChild(this._sprite), this.setLocalPosition(0, 0, 0), this.setLocalRotation(0, 0, 0), this.setLocalScale(this._config.scale), this._sprite.active = this._active, this._loadedHandler && this._loadedHandler.run()))
			}, t.getChildBeep = function (t, e) {
				if (e.name == t) return e;
				for (var i = e.numChildren, s = 0; s < i; s++) {
					var a = this.getChildBeep(t, e._childs[s]);
					if (a) return a
				}
			}, t.bindBone = function (t, e) {
				var i = this.getBone(t);
				i && i.addChild(e)
			}, t.getBone = function (t) {
				var e = this._bones[t];
				if (!e) {
					if (t !== G.ORBIT_POINT.POINT3 || this.animator._avatarNodeMap[t]) {
						if (!this.animator._avatarNodeMap[t]) return console.log("无该模型:" + this._modelId + "的绑点:" + t + "!"), null;
						e = this._sprite.addChild(new Laya.Sprite3D), this.animator.linkSprite3DToAvatarNode(t, e)
					} else e = this.avater;
					this._bones[t] = e
				}
				return e
			}, t.stopAnim = function (t) {
				this.setAnimSpeed(t, 0)
			}, t.setAnimSpeed = function (t, e) {
				this.animator && (this.animator.play(t), this.animator._controllerLayers[0]._statesMap[t].speed = e)
			}, t.clearAnim = function () {
				this.animator._controllerLayers[0]._statesMap = []
			}, t.playAnim = function (t, e, i, s, a) {
				if (this.animator) {
					a ? this.animator.crossFade(t, a, 0) : this.animator.play(t);
					var n = this.animator._controllerLayers[0]._statesMap[t];
					n.script || (n.addScript(l), n.script = n._scripts[0]), s || (s = 1), n.speed = s, i && (i = i.bind(e)), n.script.setComplete(i), this.curAnim = t, this.curAnimSpeed = s
				} else e && i && i.call(e)
			}, t.replay = function () {
				this.setActive(!1), this.setActive(!0)
			}, t.dispose = function () {
				if (!this._isDestroyed && this.loaded) {
					this._isDestroyed = !0, this.loaded = !1;
					for (var t = 0; t < this._addModels.length; t++) this._addModels[t].dispose();
					this._sprite.destroy(!0) && (this._sprite = null), this.animator = null, this.avater = null, this._canimators = [], this._parent = null, this._addModels = [], this._bones = {}, this._loadedHandler = null, this._active = !0, this._waitDestroy = !1, this._position = new Vector3(NaN, NaN, NaN), this._localPosition = new Vector3(0, 0, 0), this._localScale = new Vector3(1, 1, 1), this._localRotation = new Vector3(0, 0, 0), Laya.Pool.recover("ccModel", this)
				} else this._waitDestroy = !0
			}, t.removeParent = function () {
				this._sprite.removeSelf()
			}, t.resetAmbientColor = function (t, e) {
				for (var i = 0; i < t.numChildren; i++) {
					var s = t.getChildAt(i);
					if (s instanceof Laya.MeshSprite3D)
						for (var a = s.meshRender.materials, n = 0; n < a.length; n++) {
							(o = a[n]).ambientColor.x = e, o.ambientColor.y = e, o.ambientColor.z = e
						} else if (s instanceof Laya.SkinnedMeshSprite3D)
						for (a = s.skinnedMeshRender.materials, n = 0; n < a.length; n++) {
							var o;
							(o = a[n]).ambientColor.x = e, o.ambientColor.y = e, o.ambientColor.z = e
						}
					s.numChildren > 0 && this.resetAmbientColor(s, e)
				}
			}, t.resetAlbedo = function (t, e) {
				for (var i = 0; i < t.numChildren; i++) {
					var s = t.getChildAt(i);
					if (s instanceof Laya.MeshSprite3D)
						for (var a = s.meshRender.materials, n = 0; n < a.length; n++) {
							a[n].albedo = new Laya.Vector4(e, e, e, 1)
						} else if (s instanceof Laya.SkinnedMeshSprite3D)
						for (a = s.skinnedMeshRender.materials, n = 0; n < a.length; n++) {
							a[n].albedo = new Laya.Vector4(e, e, e, 1)
						}
					s.numChildren > 0 && this.resetAlbedo(s, e)
				}
			}, t.resetSpecularColor = function (t, e) {
				for (var i = 0; i < t.numChildren; i++) {
					var s = t.getChildAt(i);
					if (s instanceof Laya.MeshSprite3D)
						for (var a = s.meshRender.materials, n = 0; n < a.length; n++) {
							a[n].specularColor = new Laya.Vector4(e, e, e, 1)
						} else if (s instanceof Laya.SkinnedMeshSprite3D)
						for (a = s.skinnedMeshRender.materials, n = 0; n < a.length; n++) {
							a[n].specularColor = new Laya.Vector4(e, e, e, 1)
						}
					s.numChildren > 0 && this.resetAlbedo(s, e)
				}
			}, t.setDisableLight = function (t) {
				for (var e = 0; e < t.numChildren; e++) {
					var i = t.getChildAt(e);
					i instanceof Laya.MeshSprite3D ? i.meshRender.sharedMaterial && i.meshRender.sharedMaterial.disableLight() : i instanceof Laya.SkinnedMeshSprite3D && i.skinnedMeshRender.sharedMaterial && i.skinnedMeshRender.sharedMaterial.disableLight(), i.numChildren > 0 && this.setDisableLight(i)
				}
			}, t.setMaterial2 = function (t, e) {
				if (t instanceof Laya.MeshSprite3D) var i = t.meshRenderer;
				else if (t instanceof Laya.SkinnedMeshSprite3D) i = t.skinnedMeshRenderer;
				i.material = e
			}, t.setMaterial = function (t, e, i) {
				if (e || (e = this._sprite), e instanceof Laya.MeshSprite3D) var s = e.meshRenderer;
				else if (e instanceof Laya.SkinnedMeshSprite3D) s = e.skinnedMeshRenderer;
				if (s)
					if (s.material) Laya.Texture2D.load(t, Laya.Handler.create(this, function (t) {
						s.material.albedoTexture = t, i || (i = 1), s.material.albedoIntensity = i
					}));
					else {
						var a = new Laya.BlinnPhongMaterial;
						Laya.Texture2D.load(t, Laya.Handler.create(this, function (t) {
							a.albedoTexture = t, i || (i = 1), a.albedoIntensity = i, console.log(i), this.renderMode && (a.renderMode = this.renderMode)
						})), s.material = a
					} for (var n = 0; n < e.numChildren; n++) this.setMaterial(t, e._children[n], i)
			}, t.addMeshCollider = function (t, e) {
				if (t.meshFilter) {
					var i = t.addComponent(Laya.PhysicsCollider);
					let s = new Laya.MeshColliderShape;
					s.mesh = t.meshFilter.sharedMesh, i.colliderShape = s, e && e.push(i)
				}
				for (var s = t.numChildren, a = 0; a < s; a++) this.addMeshCollider(t._children[a], e)
			}, t.addBoxCollider = function (t) {
				for (var e = t.numChildren, i = [], s = 0; s < e; s++) {
					if (t._childs[s].meshFilter) {
						var a = this._sprite.addComponent(Laya.BoxCollider);
						a.setFromBoundBox(t._childs[s].meshFilter.sharedMesh.boundingBox), i.push(a)
					}
					var n = this.addBoxCollider(t._childs[s]);
					if (n.length > 0)
						for (var o = 0; o < n.length; o++) i.push(n[o])
				}
				return i
			}, t.getCollider = function () {
				return this._sprite._colliders
			}, ulee.Model._setShader = function (t) {
				for (var e = 0; e < t.numChildren; e++) {
					var i = t.getChildAt(e);
					if (i instanceof Laya.MeshSprite3D) {
						for (var s = i.meshRender.materials, a = 0; a < s.length; a++) {
							(n = s[a]).setShaderName("CustomShader"), n.normalTexture = ulee.shader.CartoonMaterial.matCap, n._tempMatrix4x40 = new Laya.Matrix4x4
						}
						i.meshRender.materials = s
					} else if (i instanceof Laya.SkinnedMeshSprite3D) {
						for (s = i.skinnedMeshRender.materials, a = 0; a < s.length; a++) {
							var n;
							(n = s[a]).setShaderName("CustomShader"), n.normalTexture = ulee.shader.CartoonMaterial.matCap, n._tempMatrix4x40 = new Laya.Matrix4x4
						}
						i.skinnedMeshRender.materials = s
					} else this._setShader(i)
				}
			}, t.addSkinComponent = function (t, e) {
				if (t instanceof Laya.MeshSprite3D) {
					var i = t.addComponent(Laya.SkinAnimations);
					i.templet = Laya.AnimationTemplet.load(e), i.player.play()
				}
				for (var s = 0, a = t._childs.length; s < a; s++) this.addSkinComponent(t._childs[s], e)
			}
		}(), window.initData = function () {
			G.dataload = function () {
				for (var t in D)
					if ("properties" != t) {
						var e = D[t],
							i = D.properties[t];
						if (i)
							for (var s in e) {
								var a = e[s],
									n = {};
								n[i[0]] = s;
								for (var o = 1, r = i.length; o < r; o++) {
									var l = a[o - 1];
									void 0 !== l && (n[i[o]] = l)
								}
								e[s] = n
							}
					} !
						function () {
							(function () {
								var t;
								for (var e in D.ScreenShow) {
									var i = D.ScreenShow[e];
									1 == e && (t = i.screenPixel), t > 10 && (i.screenPixel /= t)
								}
							})(),
								function () {
									for (var t in D.musicBasic) {
										var e = D.musicBasic[t];
										e.musicPower *= .01
									}
								}(),
								function () {
									var t = [];
									for (var e in D.PrefabsPath) {
										var i = D.PrefabsPath[e];
										i.subModel ? i.subModel = i.subModel.split("#") : i.subModel = t, i.actionInShop ? i.actionInShop = i.actionInShop.split("#") : i.actionInShop = t
									}
								}(), "undefined" != typeof addModelConfig && (addModelConfig(), function () {
									function addHead(t, e) {
										if (t)
											for (var i = 0, s = t.length; i < s; i++) t[i] = e + t[i]
									}
									var t;
									for (var e in D.ModelConfig) addHead((t = D.ModelConfig[e]).resource, e), addHead(t.zipResource, e)
								}());
							D._inited = !0, eventDispatcher.dispatchEvent(ulee.Event.ON_DATA_LOAD)
						}()
			}, G.dataload()
		},
		function (t) {
			ulee.UIManager = function () {
				this.scene = Laya.Scene, this._dialogList = {}, this._childList = {}
			}, (0, Laya.ClassUtils.regClass)(ulee.UIManager, "ulee.UIManager", void 0);
			var e = ulee.UIManager.prototype;
			e.openUI = function (t, e, i, s) {
				if (e) {
					var a = e.url;
					this._childList[a] || (this._childList[a] = []), this._childList[a].push(t), Laya.loader.create(t, Laya.Handler.create(this, function (a) {
						if (!a) return;
						var n = a.props.runtime ? a.props.runtime : a.type;
						let o = new (Laya.ClassUtils.getClass(n));
						o.url = t, o.createView(a), o.onOpened(i), e.addChild(o), s && s.run()
					}))
				} else Laya.Scene.open(t, !1, i, s)
			}, e.openDialog = function (t, e, i, s) {
				if (e) {
					var a = e.url;
					this._dialogList[a] || (this._dialogList[a] = []), this._dialogList[a].push(t), Laya.loader.create(sceneUrl, Laya.Handler.create(this, function (t) {
						let i = new Laya.View;
						i.createView(t), e.addChild(i), s && s()
					}))
				} else Laya.Scene.open(t, !1, i, s)
			}, e.closeDialog = function (t) {
				for (var e = Laya.stage._children[1]._children, i = 0; i < e.length; i++)
					if (e[i].url == t) {
						e[i].close();
						break
					}
			}, e.closeUI = function (t, e) {
				var i = this.getUI(t, e);
				if (i) {
					var s = i.url;
					if (this._dialogList[s])
						for (var a = this._dialogList[s], n = 0; n < a.length; n++) this.closeDialog(a[n]);
					if (this._dialogList[s] = null, this._childList[s])
						for (a = this._childList[s], n = 0; n < a.length; n++) this.closeUI(a[n]);
					this._childList[s] = null, i.close()
				}
			}, e.getUI = function (t, e) {
				if (this._uiList = e ? e._children : Laya.stage._children[0]._children, !this._uiList) return void console.error("未从uimanager打开任何场景");
				let i = null;
				for (let e = 0; e < this._uiList.length; e++)
					if ((i = this._uiList[e]).destroyed) this._uiList.removeAt(e), e--;
					else if (i.url == t) return i;
				return console.error("查无此UI"), null
			}
		}(), window.uiManager = new ulee.UIManager,
		function () {
			ulee.DataManager = function () {
				this._data = {}, this.init()
			}, (0, Laya.ClassUtils.regClass)(ulee.DataManager, "ulee.DataManager");
			var t = ulee.DataManager.prototype;
			t.init = function () {
				this._localData = Laya.LocalStorage, this._userData = {}
			}, t.initData = function () {
				this.dataName = "PlayerData1", this.getStorage(function (t) {
					s.getIns().copyFrom(t), this.compareTime(s.getIns().firstLoginDate) && (G.OLDUSER = !0), G.ISVIBRATE = s.getIns().isVibrate, G.ISSOUND = s.getIns().isSound, s.getIns().initMaterial(), s.getIns().setTryoutID(0), s.getIns().enterTime > 0 && this.compareTime(s.getIns().enterTime) && s.getIns().initDigNum(), s.getIns().setEnterTime(), this.compareTime(s.getIns().inGameTime) && (s.getIns().setLook(0), s.getIns().setWuXian(!1), s.getIns().setInGameTime((new Date).getTime()))
				}.bind(this))
			}, t.compareTime = function (t, e) {
				if (e) e = e.getTime();
				else {
					var i = new Date;
					e = new Date(i.getFullYear(), i.getMonth(), i.getDate()).getTime()
				}
				if (t < e) return !0
			}, t.getData = function (t) {
				return this._data[t]
			}, t.setData = function (t, e, i) {
				this._data[t] ? i ? this._data[t] = e : console.log("已存在数据") : this._data[t] = e
			}, t.clearData = function () {
				this._data = {}, this.init()
			}, t.setStorage = function (t, e) {
				let i = e || this.dataName;
				Laya.Browser.onMiniGame ? wx.setStorage({
					key: i,
					data: t
				}) : Laya.LocalStorage.setItem(i, JSON.stringify(t))
			}, t.getStorage = function (t, e) {
				let i, s = e || this.dataName;
				Laya.Browser.onMiniGame ? wx.getStorage({
					key: s,
					success(e) {
						t && t(e.data)
					},
					fail(e) {
						(i = Laya.LocalStorage.getItem(s)) && (i = JSON.parse(i)), t && t(i)
					}
				}) : ((i = Laya.LocalStorage.getItem(s)) && (i = JSON.parse(i)), t && t(i))
			}, t.removeStorage = function (t, e) {
				let i = e || this.dataName;
				Laya.Browser.onMiniGame ? wx.removeStorage({
					key: i,
					success(e) {
						t && t(e.data)
					},
					fail(e) {
						t && t(-1)
					}
				}) : Laya.LocalStorage.removeItem(i)
			}, t.clearStorage = function (t) {
				Laya.Browser.onMiniGame ? wx.clearStorage({
					success(e) {
						t && t(e.data)
					},
					fail(e) {
						t && t(-1)
					}
				}) : Laya.LocalStorage.clear()
			}, t.queryGoldSkin = function (t) {
				if (0 == s.getIns().goldSkin.length) return !1;
				for (var e = s.getIns().goldSkin.split(","), i = 0; i < e.length; i++)
					if (e[i] == t) return !0;
				return !1
			}, t.queryOwn = function (t) {
				for (var e = s.getIns().ownSkin.split(","), i = 0; i < e.length; i++)
					if (e[i] == t) return !0;
				return !1
			}, t.getTryoutSkin = function () {
				var t = [],
					e = D.gunConfig[s.getIns().curSkin];
				for (var i in D.gunConfig) this.queryOwn(i) || Number(e.id) < Number(D.gunConfig[i].id) && t.push(i);
				return t.length > 0 && t[utils.random(0, t.length - 1)]
			}, t.getMaterial = function (t) {
				var e = s.getIns().materialMap;
				if (!e) return 0;
				for (var i in e = JSON.parse(e))
					if (e[i].name == t) return e[i].num
			}, t.checkZooNum = function (t) {
				for (var e = playerData.getIns().zooArr.split("#"), i = 0; i < e.length; i++)
					if (i == t) return Object.values(JSON.parse(e[i])).length;
				return !1
			}, t.getZooData = function (t) {
				for (var e = playerData.getIns().zooArr.split("#"), i = 0; i < e.length; i++)
					if (i == t) return JSON.parse(e[i]);
				return !1
			}, t.getZooRevenue = function () {
				var t = 0;
				this.showDino = [];
				for (var e = 0; e < playerData.getIns().ownDino.length; e++) {
					let i = playerData.getIns().ownDino[e];
					if (i.isShow) {
						t += D.dinoConfig[i.id].goldKLD / 20
					}
				}
				return t
			}, t.getWarehouseNum = function () {
				for (var t = 0, e = s.getIns().ownDino, i = 0; i < e.length; i++) e[i].isShow || t++;
				return t < s.getIns().dinosaurNum
			}
		}(),
		function (t) {
			ulee.UpdateManager = function () {
				this.id = 0, this.totalTime = 0, this.LoopArr = {}, this.onlineCD = 3, Laya.timer.frameLoop(1, this, this.update)
			}, (0, Laya.ClassUtils.regClass)(ulee.UpdateManager, "ulee.UpdateManager", void 0);
			var e = ulee.UpdateManager.prototype;
			e.update = function (t) {
				var e = Laya.timer.delta / 1e3;
				for (var i in this.totalTime += e, G.FPSAVERAGE = parseInt(1 / e), G.FRAME_INTERVAL = e > .03 ? .03 : e, G.NOW = Laya.Browser.now(), this.LoopArr) {
					var a = this.LoopArr[i];
					a.caller ? a.type == G.ENUM_LOOP_TYPE.FRAME ? (a.frame++, a.frame == a.targetFrame && (a.func(), a.isOnce ? delete this.LoopArr[i] : a.frame = 0)) : a.type == G.ENUM_LOOP_TYPE.TIME && (a.time += e, a.time >= a.targetTime && (a.func(), a.isOnce ? delete this.LoopArr[i] : a.time = 0)) : console.log("warning:有方法没被移除" + a.func)
				}
				G.MainUI && (this.onlineCD -= G.FRAME_INTERVAL, this.onlineCD < 0 && (this.onlineCD = 3, s.getIns().addIncome(), s.getIns().updateOnlineTime())), utils.m_systemPrompt && G.NOW - utils.m_systemPrompt.showTime > 3e3 && (utils.m_systemPrompt.bgSprite.alpha = 0)
			}, e.frameLoop = function (t, e, i, s) {
				var a = this.id++,
					n = "FL" + a,
					o = {
						frame: 0,
						targetFrame: t,
						func: i.bind(e, s),
						args: s,
						caller: e,
						type: G.ENUM_LOOP_TYPE.FRAME,
						id: a
					};
				return this.LoopArr[n] = o, e.$updateArr ? e.$updateArr.push(n) : e.$updateArr = [n], n
			}, e.frameOnce = function (t, e, i, s) {
				var a = this.id++,
					n = "FO" + a,
					o = {
						frame: 0,
						targetFrame: t,
						func: i.bind(e, s),
						args: s,
						isOnce: !0,
						caller: e,
						type: G.ENUM_LOOP_TYPE.FRAME,
						id: a
					};
				return e.$updateArr ? e.$updateArr.push(n) : e.$updateArr = [n], this.LoopArr[n] = o, n
			}, e.timeLoop = function (t, e, i, s) {
				var a = this.id++,
					n = "TL" + a,
					o = {
						time: 0,
						targetTime: t,
						func: i.bind(e, s),
						args: s,
						caller: e,
						type: G.ENUM_LOOP_TYPE.TIME,
						id: a
					};
				return e.$updateArr ? e.$updateArr.push(n) : e.$updateArr = [n], this.LoopArr[n] = o, n
			}, e.timeOnce = function (t, e, i, s) {
				var a = this.id++,
					n = "TO" + a,
					o = {
						time: 0,
						targetTime: t,
						func: i.bind(e, s),
						args: s,
						isOnce: !0,
						caller: e,
						type: G.ENUM_LOOP_TYPE.TIME,
						id: a
					};
				return e.$updateArr ? e.$updateArr.push(n) : e.$updateArr = [n], this.LoopArr[n] = o, n
			}, e.clear = function (t, e) {
				this.LoopArr[t] && delete this.LoopArr[t], e && e.$updateArr.remove(t)
			}, e.clearAll = function (t) {
				if (t.$updateArr) {
					for (var e = 0; e < t.$updateArr.length; e++) {
						var i = t.$updateArr[e];
						this.clear(i)
					}
					t.$updateArr = null
				}
			}
		}(),
		function () {
			ulee.AudioManager = function () {
				this.soundManager = Laya.SoundManager, this.soundManager.autoReleaseSound = !1, this.isBGM || (this.hasChangeMusic = !0), this.setSoundVolume(.3), this.curSounds = {}
			}, (0, Laya.ClassUtils.regClass)(ulee.AudioManager, "ulee.AudioManager");
			var t = ulee.AudioManager.prototype;
			t.playMusic = function (t) {
				t && (this.bgmId != t ? (this.bgmId = t, this.hasChangeMusic = !0) : this.hasChangeMusic = !1, G.ISSOUND && (this.bgmId = t || this.bgmId, this.soundManager.playMusic(this.getResurl(this.bgmId), 0), this.isPlaying = !0))
			}, t.stopMusic = function () {
				this.soundManager.stopMusic(), this.isPlaying = !1
			}, t.huifuMusicMuted = function () {
				G.ISSOUND && this.setMusicMuted(!0)
			}, t.setMusicMuted = function (t) {
				this.soundManager.musicMuted = !t
			}, t.setMusicVolume = function (t) {
				this.soundManager.musicVolume = t
			}, t.playSound = function (t, e, i) {
				if (G.ISSOUND) {
					if (this.curSounds[t]) {
						if (!i && this.curSounds[t].length > 0) return
					} else this.curSounds[t] = [];
					if (Laya.Browser.onMiniGame) (s = uleeSDK.pf.createInnerAudioContext()).src = this.getResurl(t), s.onEnded(function () {
						this.curSounds[t].removeAt(this.curSounds[t].indexOf(t)), e && e()
					}.bind(this)), s.play();
					else var s = this.soundManager.playSound(this.getResurl(t), 1, new Handler(this, function () {
						this.curSounds[t].removeAt(this.curSounds[t].indexOf(t)), e && e()
					}));
					this.curSounds[t].push(s)
				}
			}, t.stopSound = function (t) {
				if (this.curSounds[t] && this.curSounds[t].length > 0)
					for (var e = 0; e < this.curSounds[t].length; e++) Laya.Browser.onMiniGame ? this.curSounds[t][e].destroy() : this.soundManager.stopSound(this.getResurl(t)), this.curSounds[t].removeAt(e)
			}, t.setSoundVolume = function (t) {
				this.soundManager.soundVolume = t
			}, t.stopAllSound = function () {
				this.soundManager.stopAllSound()
			}, t.getResurl = function (t) {
				return D.musicBasic[t].file
			}
		}(),
		function () {
			ulee.LoadItem = function (t, e, i) {
				this.loaded = !1, this.loadFn = t, this.count = e, this.checkFn = i, this.loading = null
			}, (0, Laya.ClassUtils.regClass)(ulee.LoadItem, "ulee.LoadItem");
			var t = ulee.LoadItem.prototype;
			t.onComplete = function () {
				this.loaded = !0
			}, t.start = function () {
				this.loadFn()
			}
		}(),
		function () {
			ulee.PromptUtils = function () { }, (0, Laya.ClassUtils.regClass)(ulee.PromptUtils, "ulee.PromptUtils");
			var t = ulee.PromptUtils.prototype;
			t.init = function () {
				this.bgSprite = new Laya.Image("nine/img_infoBase.png"), this.bgSprite.width = Laya.stage.width - 40, this.bgSprite.height = 50, this.bgSprite.anchorX = .5, this.bgSprite.anchorY = .5, this.bgSprite.x = Laya.stage.width / 2, this.bgSprite.y = Laya.stage.height / 9, this.textOffx = 30, this.textOffy = 15, this.tipText = new Laya.Label, this.bgSprite.addChild(this.tipText), this.tipText.width = this.bgSprite.width - 2 * this.textOffx, this.tipText.fontSize = 30, this.tipText.align = "center", this.tipText.color = "#ffffff", this.tipText.y = this.textOffy, this.bgSprite.zOrder = 2e3, Laya.stage.addChild(this.bgSprite), this.timeLine = new Laya.TimeLine, this.timeLine.addLabel("scale", 0).to(this.bgSprite, {
					scaleX: 1.2,
					scaleY: 1.2,
					alpha: 1
				}, 100, null, 0).addLabel("back", 0).to(this.bgSprite, {
					scaleX: 1,
					scaleY: 1,
					alpha: 1
				}, 100, null, 0).addLabel("show", 0).to(this.bgSprite, {
					alpha: 1
				}, 1e3, null, 0).addLabel("hide", 0).to(this.bgSprite, {
					alpha: 0
				}, 1e3, null, 0), this.timeLine.on(Laya.Event.COMPLETE, this, this.onComplete), this.mouseThrough = !0
			}, t.removeRes = function () {
				this.timeLine.destroy()
			}, t.onComplete = function () {
				this.visible = !1, this.mouseThrough = !0
			}, t.prompt = function (t) {
				this.tipText.text = t, this.tipText.x = this.textOffx, this.bgSprite.height = 30 + this.textOffx, this.timeLine.play(0, !1), this.visible = !0
			}, t.prompt1 = function (t) {
				this.bgSprite.skin = t, this.bgSprite.height = null, this.bgSprite.width = null, this.timeLine.play(0, !1), this.visible = !0
			}, t.resize = function () {
				this.bgSprite && (this.bgSprite.width = Laya.stage.width - 40, this.bgSprite.height = this.tipText.contextHeight + this.textOffx, this.bgSprite.x = Laya.stage.width / 2, this.bgSprite.y = Laya.stage.height / 8, this.tipText && (this.tipText.style.width = this.bgSprite.width - 2 * this.textOffx))
			}
		}(), window.promptUtils = new ulee.PromptUtils,
		function () {
			ulee.MovePrompt = function () {
				this.needCloseBtn = !1, this.$updateArr = []
			}, (0, Laya.ClassUtils.regClass)(ulee.MovePrompt, "ulee.MovePrompt");
			var t = ulee.MovePrompt.prototype;
			t.init = function () {
				this.frameCount = 0, updateManager.frameLoop(1, this, this.update), this.paramsArray = [], this.promptArray = [], this.mouseThrough = !0
			}, t.removeRes = function () {
				this.paramsArray = [], Laya.timer.clear(this, this.update)
			}, t.addPrompt = function (t) {
				this.paramsArray.length < 20 && this.paramsArray.push({
					msg: t
				})
			}, t.update = function () {
				if (!(this.frameCount++ < 15)) {
					for (var t = 0, e = this.promptArray.length - 1; e >= 0; e--)
						if (null != this.promptArray[e - 1] && this.promptArray[e].y - 40 <= this.promptArray[e - 1].y) {
							t = e;
							break
						} if (t > 0)
						for (e = t; e > 0; e--) this.collFly(this.promptArray[e - 1]);
					if (this.frameCount = 0, this.paramsArray.length > 0) {
						var i = this.paramsArray.shift();
						this.prompt(i.msg)
					}
				}
			}, t.prompt = function (t) {
				var e = new Laya.Image("nine/img_infoBase.png");
				e.y = Laya.stage.height / 2, e.zOrder = 2e3, Laya.stage.addChild(e);
				var i = new Laya.Text;
				i.fontSize = 35, i.color = "#ffffff", i.text = t, e.addChild(i), e.size(i.width + 100, i.height + 20), e.x = (Laya.stage.width - e.width) / 2, i.x = 50, i.y = (e.height - i.height) / 2, this.promptArray.push(e), Laya.Tween.to(e, {
					y: Laya.stage.height / 4
				}, 1500, Laya.Ease.expoOut, new Laya.Handler(this, function () {
					this.removeSpr(e)
				}))
			}, t.collFly = function (t) {
				t.m_delayTime ? t.m_delayTime++ : t.m_delayTime = 1, t.m_delayTime > 7 || (Laya.Tween.clearTween(t), Laya.Tween.to(t, {
					y: Laya.stage.height / 4 - 50 * t.m_delayTime
				}, Math.max(100, 800 - 100 * t.m_delayTime), Laya.Ease.expoOut, new Laya.Handler(this, function () {
					this.removeSpr(t)
				})))
			}, t.removeSpr = function (t) {
				this.promptArray.remove(t), t.removeSelf()
			}
		}(), window.movePromptUtils = new ulee.MovePrompt,
		function () {
			ulee.GuideScript = function () {
				this.guideUI = null, this.guideContainer = null, this.maskArea = null, this.interactionArea = null, this.hitArea = null, this.tipContainer = null, this.guideStep = 0, this.guideSteps = []
			}, (0, Laya.ClassUtils.regClass)(ulee.GuideScript, "ulee.GuideScript");
			var t = ulee.GuideScript.prototype;
			t.init = function (t, e) {
				this.guideUI = t;
				for (var i = 0; i < e.length; i++) this.guideSteps.push(e[i]);
				this.createPage()
			}, t.createPage = function () {
				this.guideContainer = new Laya.Sprite, this.guideUI.addChild(this.guideContainer), this.guideContainer.cacheAs = "bitmap", this.maskArea = new Laya.Sprite, this.guideContainer.addChild(this.maskArea), this.maskArea.alpha = .8, this.maskArea.graphics.drawRect(0, 0, Laya.stage.width, Laya.stage.height, "#000"), this.interactionArea = new Laya.Sprite, this.guideContainer.addChild(this.interactionArea), this.interactionArea.blendMode = "destination-out", this.hitArea = new Laya.HitArea, this.hitArea.hit.drawRect(0, 0, Laya.stage.width, Laya.stage.height, "#000"), this.guideContainer.hitArea = this.hitArea, this.guideContainer.mouseEnabled = !0, this.tipContainer = new Laya.Label, this.tipContainer.font = "SimHei", this.tipContainer.fontSize = 45, this.tipContainer.color = "#f8f6f6", this.tipContainer.align = "left", this.tipContainer.wordWrap = !0, this.tipContainer.width = .6 * Laya.stage.width, Laya.stage.addChild(this.tipContainer), this.nextStep()
			}, t.nextStep = function () {
				if (this.guideStep === this.guideSteps.length) return Laya.stage.removeChild(this.guideContainer), void Laya.stage.removeChild(this.tipContainer);
				var t = this.guideSteps[this.guideStep++];
				this.hitArea.unHit.clear(), this.hitArea.unHit.drawRect(t.x, t.y, t.width, t.height, "#000000"), this.interactionArea.graphics.clear(), this.interactionArea.graphics.drawRect(t.x, t.y, t.width, t.height, "#000000"), t.tipstr ? (this.tipContainer.text = t.tipstr, this.tipContainer.x = t.x + t.width + 50, this.tipContainer.y = t.y) : this.tipContainer.text = ""
			}, t.clearPage = function () {
				this.guideContainer && this.guideContainer.destroy(), this.tipContainer && this.tipContainer.destroy()
			}
		}(), window.guideScript = new ulee.GuideScript,
		function () {
			ulee.BattleMgr = function () {
				this.$updateArr = []
			}, (0, Laya.ClassUtils.regClass)("ulee.BattleMgr", ulee.BattleMgr);
			var t = ulee.BattleMgr.prototype;
			t.initData = function () {
				this.isGameStart = !1
			}, t.initRound = function (t, e) {
				this.initData()
			}, t.startGame = function () {
				this.isGameStart = !0
			}, t.endGame = function () {
				this.isGameStart = !1
			}, t.revive = function () { }, t.restartGame = function () { }, t.loop = function () {
				G.FRAME_INTERVAL
			}
		}(), window.battleMgr = new ulee.BattleMgr;
	new class {
		constructor() {
			window.Laya3D ? Laya3D.init($.width, $.height) : Laya.init($.width, $.height, Laya.WebGL),
				Laya.stage.bgColor = "#ff8a4b", Laya.Physics && Laya.Physics.enable(),
				Laya.DebugPanel && Laya.DebugPanel.enable(), Laya.stage.scaleMode = $.scaleMode,
				Laya.stage.screenMode = $.screenMode, Laya.stage.alignV = $.alignV,
				Laya.stage.alignH = $.alignH, Laya.URL.exportSceneToJson = $.exportSceneToJson,
				($.debug || "true" == Laya.Utils.getQueryString("debug")) && Laya.enableDebugPanel(),
				$.physicsDebug && Laya.PhysicsDebugDraw && Laya.PhysicsDebugDraw.enable(),
				$.stat && Laya.Stat.show(),
				Laya.alertGlobalError = !0,
				Laya.stage._setScreenSize = Laya.stage.setScreenSize,				
				Laya.stage.setScreenSize = function (t, e, i) {
					if (!Laya.stage._isInputting()) {							
					var s = function () {
						if (G.SCREEN_MODE == G.SCREEN_MODETYPE.H) {
							var t = {},
								e = Laya.Browser.clientWidth * Laya.Browser.pixelRatio,
								i = Laya.Browser.clientHeight * Laya.Browser.pixelRatio,
								s = 1559 / 854,
								a = 1559 / 720,
								n = o = Laya.Browser.onPC ? i / e : i > e ? i / e : e / i;
							o > 1559 / 720 ? (t.scaleMode = Laya.Stage.SCALE_FIXED_AUTO,
								t.height = 720,
								t.width = 1559,
								G.ratio = Laya.Browser.clientWidth / Laya.stage.width) : o < 1559 / 720 ? (t.scaleMode = Laya.Stage.SCALE_FIXED_AUTO, t.height = 854, t.width = 1559, G.ratio = Laya.Browser.clientHeight / Laya.stage.height) : (t.scaleMode = Laya.Stage.SCALE_FIXED_HEIGHT, t.height = 720, t.width = 1559, G.ratio = Laya.Browser.clientWidth / Laya.stage.width),
								t.trueRate = n
						} else {
							var o;
							t = {}, e = Laya.Browser.clientWidth * Laya.Browser.pixelRatio,
								i = Laya.Browser.clientHeight * Laya.Browser.pixelRatio,
								s = 1559 / 854, a = 1559 / 720,
								n = o = Laya.Browser.onPC ? i / e : i > e ? i / e : e / i, o > a ?
								(t.scaleMode = Laya.Stage.SCALE_FIXED_AUTO, t.height = 1559, t.width = 720, G.ratio = Laya.Browser.clientWidth / Laya.stage.width) : o < s ? (t.scaleMode = Laya.Stage.SCALE_FIXED_AUTO, t.height = 1559, t.width = 854, G.ratio = Laya.Browser.clientHeight / Laya.stage.height) : (t.scaleMode = Laya.Stage.SCALE_FIXED_HEIGHT, t.height = 1559, t.width = 854, G.ratio = Laya.Browser.clientWidth / Laya.stage.width), t.trueRate = n
						}
						return t
					}();
					this._scaleMode = s.scaleMode,
						this.designHeight = s.height,
						this.designWidth = s.width,
						console.log("chay vao day may lan?")
						/*this._setScreenSize(t, e), i || Laya.timer.once(2e3, null, function () {
						Laya.stage.setScreenSize(Laya.Browser.clientWidth * Laya.Browser.pixelRatio, Laya.Browser.clientHeight * Laya.Browser.pixelRatio, !0)
					})*/
				}
			}, Laya.stage._changeCanvasSize(), Laya.ResourceVersion.enable("version.json", Laya.Handler.create(this, this.onVersionLoaded), Laya.ResourceVersion.FILENAME_VERSION)
		}
		onVersionLoaded() {
			Laya.AtlasInfoManager.enable("fileconfig.json", Laya.Handler.create(this, this.onConfigLoaded))
		}
		onConfigLoaded() {
			window.updateManager = new ulee.UpdateManager, window.uiManager = new ulee.UIManager, window.audioManager = new ulee.AudioManager, eventDispatcher.addEventListen(ulee.Event.ON_DATA_LOAD, this, function () {
				window.dataManager = new ulee.DataManager, dataManager.initData(), this.onConfigLoaded_sdk_fb()
			}), initData()
		}
		onConfigLoaded_sdk_fb() {
			if ("undefined" != typeof minigame) {
				let t = this;
				minigame.initializeAsync().then(function () {
					console.log("FB initializeAsync"),
						minigame.getEntryPointAsync().then(function (t) {
						console.info("Entry Point: ", t)
					});
					/*const e = minigame.context.getType();*/
					/*console.info("Context Type: ", e),*/ t.startMiniGameSDK()
				})
			}
		}
		startMiniGameSDK() {
			"undefined" != typeof minigame && (minigame.setLoadingProgress(100), minigame.startGameAsync().then(function () {
				$.startScene && uiManager.openUI($.startScene)
			}).catch(function (t) {
				console.info("startGameAsync error: " + t)
			}))
		}
	}
}();