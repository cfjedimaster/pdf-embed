# <pdf-embed>

A web component that adds support for Adobe's [PDF Embed API](https://developer.adobe.com/document-services/apis/pdf-embed/). This (free) library lets you add a PDF display to your web page, controlling the size, reading experience and so forth. This web component doesn't expose every feature of the library but should cover most use cases. You can read more about the API [here](https://developer.adobe.com/document-services/docs/overview/pdf-embed-api/).

## Requirements

You must have a client ID created at Adobe's Developer Console. You can sign up [here](https://acrobatservices.adobe.com/dc-integration-creation-app-cdn/main.html?api=pdf-embed-api). Note that the key is domain bound which means it only works on one domain. Also, note that keys can only have one domain. With that in mind:

* If you want to test on localhost and something else dot com, you will need two keys. 
* If you set your domain credential to include www, it will not work if someone hits your site without the www. Just specify the domain without any www or some such, and it will work in any subdomain under the initial domain.

## Usage

There are two required attributes, `url` and `key`. The URL should be a publicly accessible pointer to your PDF. The key is the credential you got from the Adobe developer console.

You can optionally pass in `embedMode` which is one of four values:

* FULL_WINDOW - This is *not* the full window, but rather, the entire div. It shows the pages in a 'stream' so you can scroll through it.
* SIZED_CONTAINER - This shows the PDF one page at a time.
* IN_LINE - Will show the *entire* PDF in a long vertical div. Be careful with this one.
* LIGHT_BOX - This won't throw an error, but isn't really a good use case for the component. I'd avoid this one.

### Example 

```html
<pdf-embed url="https://documentservices.adobe.com/view-sdk-demo/PDFs/Bodea Brochure.pdf"
		   key="bce5ad180d164236b0998429b39d77cf">

	<p>
		Read our cool PDF <a href="https://documentservices.adobe.com/view-sdk-demo/PDFs/Bodea Brochure.pdf">here</a>.
	</p>

</pdf-embed>
```

## Installation

Via [npm](https://www.npmjs.com/package/@raymondcamden/pdf-embed) or download [pdf-embed.js](./pdf-embed.js) directly.

```
npm i @raymondcamden/table-sorter
```