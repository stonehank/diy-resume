module.exports={
  "primaryLang": "english",
  "otherLangList": [
    // "chinese"
  ],
  "languageUrlStr": {
    "english": "",
    "chinese": "/cn"
  },
  "isoCode": {
    "english": "en",
    "chinese": "zh"
  },
	createDefaultMeta:function createDefaultMeta(folder1,folder2,page,author='',){
	  let title=page
	  if(page==='index'){
	    if(folder2){
	      title=folder2
	    }else if(folder1){
	      title=folder1
	    }
	  }
	  let uppTit=title.split('-').map(s=>s[0].toUpperCase()+s.slice(1)).join(' ')
	  return {
	    title:uppTit,
	    og_title: uppTit,
	    keywords: '',
	    og_url: '',
	    description: '',
	    og_description: '',
	    og_image: '',
	    author,
	  }
	}
}