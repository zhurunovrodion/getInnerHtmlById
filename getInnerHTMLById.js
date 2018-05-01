function getInnerHTMLById(htmlString, id) {
	let allTagsFindRegExp = new RegExp("<(\"[^\"]*\"|'[^']*'|[^'\">])*?>([^<])*", "ig");
	let findElementByIdRegExp = new RegExp("<(.*id *= *\"" + id + " *\".*)*>", "ig");
	let openTagRegExp = new RegExp("<[a-z0-9]+ *", "ig");
	let closeTagRegExp = new RegExp("<\/[a-z0-9]+ *", "ig");
	let singleTagRegExp = new RegExp("<[a-z0-9]+ *", "ig");
	let singleTagArray = ["img", "br", "hr", "area", "base", "col", "embed", "input", "keygen", "link", "menuitem", "meta", "param", "source", "track", "wbr"];
	let tagsArray = htmlString.match(allTagsFindRegExp);
	if(tagsArray !== null) {
		let idIndex = 0;
		let lastIndexOfTags = 0;
		let isNoElementById = true;
		for(let i = 0; i < tagsArray.length; i++) {
			if(tagsArray[i].match(findElementByIdRegExp)) {
				idIndex = i;
				isNoElementById = false;
				let checkupArrayOfTags = [];
				let countOfOpenTags = 0;
				let countOfCloseTags = 0;
				checkupArrayOfTags.push(tagsArray[i]);
				countOfOpenTags++;
				for(let j = idIndex + 1; j < tagsArray.length; j++) {
					currentTag = tagsArray[j];
					if(checkupArrayOfTags.length > 0) {
						if(currentTag.match(openTagRegExp)) {
							if(!singleTagCheck(currentTag)) {
								countOfOpenTags++;
							}
						}
						if(currentTag.match(closeTagRegExp)) {
							countOfCloseTags++;
							lastIndexOfTags = j;
						}
						if(countOfCloseTags == countOfOpenTags) {
							break;
						}
					}
				}
			}
		}
		if(isNoElementById){
			console.log('no matches with id = '+ id);
			return false;
		}else{
			return(splitResultArrayOfHTML(tagsArray, idIndex, lastIndexOfTags));
		}
		
	} else {
		return 'Not valid html string';
	}

	function splitResultArrayOfHTML(arrayOfTags, firstIndex, lastIndex) {
		let resultHTML = '';
		for(let i = firstIndex; i <= lastIndex; i++) {
			resultHTML += arrayOfTags[i];
		}
		return resultHTML;
	}

	function singleTagCheck(tag) {
		tag = tag.match(singleTagRegExp).join().trim().replace('<', '');
		for(let i = 0; i < singleTagArray.length; i++) {
			if(tag == singleTagArray[i]) {
				return true;
			}
		}
		return false;
	}
}

var testHtmlString = '<div class="showNews"><div class="breadCrumbWrapper textStandart m--breadCrumbWrapper-withPadding"><div  class="breadCrumb"><ul class="breadCrumb__list"><li class="breadCrumb__element"> <a href="/">радио 100</a></li><li class="breadCrumb__element"> <a href="/novosti/">Новости</a></li></ul></div></div><div class="twoColumsContent"><div class="twoColumsContent__wrapper"><div   class="twoColumsContent__firstColumn"><div class="oneColumnHeader textStandart"><h1>Группа ABBA записала новые песни</h1></div><div id="test2" class="headerImageBlock"> <img src="/files/images/2804abba.jpg" alt="Изображение новости"></div></div><div class="twoColumsContent__secondColumn m--secondColumn-bgGrey"><div  class="textBlockContent textStandart"><div class="dateBlock "> 2018/04/28</div><p>Шведский квартет ABBA анонсировал выход двух новых песен, сообщается в&nbsp;Instagram&nbsp;музыкантов.</p><p>«Мы вчетвером почувствовали, что после 35 лет будет весело снова собраться и поработать в звукозаписывающей студии. И мы сделали это. И нам показалось, что ничего как будто не поменялось за все это время, а мы всего лишь ушли в короткий отпуск», — говорится в посте.</p><p >Участники группы объявили, что им удалось записать две песни. Одну из композиций, которая получила название I Still Have Faith In You, проиграют по телевидению в декабре. Релизом займутся&nbsp;«Би-би-си»&nbsp;и&nbsp;NBC. «Мы, может, уже совсем зрелые, но песня — новая. И это здорово», — отметили музыканты.</p><p>В октябре 2016 года ABBA объявила о воссоединении. Последнее официальное выступление группы состоялось в 1982-м, однако в июне 2016 года ABBA сыграла на частном гала-вечере в Стокгольме.</p><p>&nbsp;</p><p>Фото:&nbsp;<a href="https://www.newsmax.com/" target="_blank">newsmax.com</a></p></div></div></div></div></div>';
console.log(getInnerHTMLById(testHtmlString, 'test2')); 