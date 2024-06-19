import { v4 as uuidv4 } from 'https://jspm.dev/uuid';

class PDFEmbed extends HTMLElement {

    constructor() {
		super();
		
		if(this.hasAttribute('url')) this.url = this.getAttribute('url');		
		if(this.hasAttribute('key')) this.key = this.getAttribute('key');

		if(this.hasAttribute('width')) this.width = this.getAttribute('width');
		else this.width = '500px';

		if(this.hasAttribute('height')) this.height = this.getAttribute('height');
		else this.height = '500px';

		this.embedMode = 'FULL_WINDOW';
		if(this.hasAttributes('embedMode')) this.embedMode =  this.getAttribute('embedMode');

		// if no url, safe to just return?
		if(!this.url) {
			console.error('pdf-embed: No url attribute passed.');
			return;
		}

		// Ditto for key
		if(!this.key) {
			console.error('pdf-embed: No key attribute passed.');
			return;
		}

		this.name = this.url.split('/').pop();
	}

	loadPDF() { 
		let adobeDCView = new AdobeDC.View({clientId: this.key, divId: this.divid });
		adobeDCView.previewFile({
			content:{location: {url: this.url }},
			metaData:{fileName: this.name}
		}, {
			embedMode: this.embedMode,
			focusOnRendering:false
		});

		adobeDCView.registerCallback(
			AdobeDC.View.Enum.CallbackType.EVENT_LISTENER,
			event => {
				this.dispatchEvent(new CustomEvent(event.type, {
					composed: true, 
					bubbles: true, 
					detail: event.data
				}));
			}, { enableFilePreviewEvents: true, enablePDFAnalytics: true, enableAnnotationEvents:true }
		);

	}

	connectedCallback() {

		this.divid = uuidv4();
		const wrapper = document.createElement('div');
		wrapper.id = this.divid;

		wrapper.style = `width: ${this.width}; height: ${this.height}`;


		this.innerHTML = '';
		this.parentNode.insertBefore(wrapper, this.nextSibling);

		/*
		the below doesnt work in my test where I have 2 right after each other, but it makes
		sense, we haven't loaded yet. However, if I use JS to add a new pdf-embed element, in theory, 
		this optimization will work.
		*/
		if(window.AdobeDC) { 
			this.loadPDF();  
		} else {
			const script = document.createElement('script');
			script.type = 'text/javascript';
			script.src='https://documentservices.adobe.com/view-sdk/viewer.js';
			document.head.appendChild(script);

			if(window.AdobeDC) this.loadPDF();
			else document.addEventListener('adobe_dc_view_sdk.ready', () => this.loadPDF());
		}

	}

}

customElements.define('pdf-embed', PDFEmbed);


