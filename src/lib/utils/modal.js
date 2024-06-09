export class Modal {

	id = 'editor-' + (Math.random() * 10000).toFixed(0);
	el = null;
	config = {
		closeOnOutsideClick: true,
		width: 'sm',
	}
	constructor(config) {
		this.config = { ...this.config, ...(config || {}) };
		this.create();
	}

	get titleEl() {
		return this.el.querySelector('.inner .header .title');
	}

	get contentEl() {
		return this.el.querySelector('.inner .content');
	}

	get footerActionsEl() {
		return this.el.querySelector('.inner .footer .actions');
	}

	create() {
		const html = `
			<div id="${this.id}" class="editor-modal outer --width-${this.config.width}">
				<div class="inner">
					<div class="header"><p class="title"></p></div>
					<div>
						<form>
							<div class="content"></div>
						</form>
					</div>
					<div class="footer"><div class="actions"></div></div>
				</div>
			</div>
		`;
		document.body.insertAdjacentHTML('beforeend', html);
		this.el = document.querySelector('#' + this.id);

		// allow enter to submit
		this.el.querySelector('form').addEventListener('submit', (e) => {
			e.preventDefault();
			// click primary button if it exists
			const primaryActions = this.footerActionsEl.querySelectorAll('button.editor-btn.--primary');
			if (primaryActions.length === 1) {
				primaryActions[0].click();
			}
		})

		if (this.config.closeOnOutsideClick) {
			this.el.addEventListener('click', (e) => {
				if (e.target.matches('.editor-modal.outer')) {
					this.destroy();
				}
			})
		}
	}

	destroy() {
		this.el.outerHTML = '';
	}

	setContentHTML(html) {
		this.contentEl.innerHTML = html;
	}

	setTitle(titleText) {
		this.titleEl.innerText = titleText;
	}

	setFooterActions(actions) {
		for (const action of actions) {
			const html = `<button class="editor-btn --${action.btnStyle}">${action.text}</button>`;
			this.footerActionsEl.insertAdjacentHTML('beforeend', html);
			const el = this.footerActionsEl.querySelector('button:last-child');
			el.addEventListener('click', action.onClick);
		}
	}

}