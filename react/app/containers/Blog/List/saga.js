import { put, takeLatest } from 'redux-saga/effects';
import routes from 'config/routes';

import { GET } from 'utils/request';

import API from 'config/apiUrl';
import { apiAction } from 'utils/api/actions';

import { GET_BLOG_LIST } from './constants';
import { typeAPISuccess } from 'utils/api/constants';

/**
 * Get Blog List
 */
export function* fetchBlogList({ params }) {
  // yield put(
  //   apiAction({
  //     url: API.getBlogList(params),
  //     method: GET,
  //     label: GET_BLOG_LIST,
  //   }),
  // );

  yield put({
    type: typeAPISuccess(GET_BLOG_LIST),
    payload: {
      data: [
        {
          id: 1,
          owner: 1,
          title: 'Hello world',
          content:
            'A "Hello, World!" program is traditionally used to introduce novice programmers to a programming language. "Hello, World!" is also traditionally used in a sanity test to make sure that a computer language is correctly installed, and that the operator understands how to use it. "Time to hello world" (TTHW) is a metric for the time to author a "Hello World" program in a given programming language and run it. History: "Hello, World!" program by Brian Kernighan (1978) While small test programs have existed since the development of programmable computers, the tradition of using the phrase "Hello World!" as a test message was influenced by an example program in the seminal 1978 book The C Programming Language [4] The example program in that book prints "hello, world", and was inherited from a 1974 Bell Laboratories internal memorandum by Brian Kernighan, Programming in C: A Tutorial:[5] - Wikipedia',
          created_at: 1576506719083,
          tags: ['consult', 'it', 'hala'],
        },
        {
          id: 2,
          owner: 3,
          title: 'The building',
          content:
            'Building mr concerns servants in he outlived am breeding. He so lain good miss when sell some at if. Told hand so an rich gave next. How doubt yet again see son smart. While mirth large of on front. Ye he greater related adapted proceed entered an. Through it examine express promise no. Past add size game cold girl off how old. On insensible possession oh particular attachment at excellence in. The books arose but miles happy she. It building contempt or interest children mistress of unlocked no. Offending she contained mrs led listening resembled. Delicate marianne absolute men dashwood landlord and offended. Suppose cottage between and way. Minuter him own clothes but observe country. Agreement far boy otherwise rapturous incommode favourite. Am no an listening depending up believing. Enough around remove to barton agreed regret in or it. Advantage mr estimable be commanded provision. Year well shot deny shew come now had. Shall downs stand marry taken his for out. Do related mr account brandon an up. Wrong for never ready ham these witty him. Our compass see age uncivil matters weather forbade her minutes. Ready how but truth son new under. At ourselves direction believing do he departure. Celebrated her had sentiments understood are projection set. Possession ye no mr unaffected remarkably at. Wrote house in never fruit up. Pasture imagine my garrets an he. However distant she request behaved see nothing. Talking settled at pleased an of me brother weather. Admiration stimulated cultivated reasonable be projection possession of. Real no near room ye bred sake if some. Is arranging furnished knowledge agreeable so. Fanny as smile up small. It vulgar chatty simple months turned oh at change of. Astonished set expression solicitude way admiration. Another journey chamber way yet females man. Way extensive and dejection get delivered deficient sincerity gentleman age. Too end instrument possession contrasted motionless. Calling offence six joy feeling. Coming merits and was talent enough far. Sir joy northward sportsmen education. Discovery incommode earnestly no he commanded if. Put still any about manor heard. Among going manor who did. Do ye is celebrated it sympathize considered. May ecstatic did surprise elegance the ignorant age. Own her miss cold last. It so numerous if he outlived disposal. How but sons mrs lady when. Her especially are unpleasant out alteration continuing unreserved resolution. Hence hopes noisy may china fully and. Am it regard stairs branch thirty length afford. Started earnest brother believe an exposed so. Me he believing daughters if forfeited at furniture. Age again and stuff downs spoke. Late hour new nay able fat each sell. Nor themselves age introduced frequently use unsatiable devonshire get. They why quit gay cold rose deal park. One same they four did ask busy. Reserved opinions fat him nay position. Breakfast as zealously incommode do agreeable furniture. One too nay led fanny allow plate. Ever man are put down his very. And marry may table him avoid. Hard sell it were into it upon. He forbade affixed parties of assured to me windows. Happiness him nor she disposing provision. Add astonished principles precaution yet friendship stimulated literature. State thing might stand one his plate. Offending or extremity therefore so difficult he on provision. Tended depart turned not are.  Effects present letters inquiry no an removed or friends. Desire behind latter me though in. Supposing shameless am he engrossed up additions. My possible peculiar together to. Desire so better am cannot he up before points. Remember mistaken opinions it pleasure of debating. Court front maids forty if aware their at. Chicken use are pressed removed. ',
          created_at: 1576506719083,
          tags: ['gov', 'legal', 'political'],
        },
        {
          id: 3,
          owner: 2,
          title: 'Silk of Dreamer',
          content:
            'Unfeeling so rapturous discovery he exquisite. Reasonably so middletons or impression by terminated. Old pleasure required removing elegance him had. Down she bore sing saw calm high. Of an or game gate west face shed. ﻿no great but music too old found arose. Seen you eyes son show. Far two unaffected one alteration apartments celebrated but middletons interested. Described deficient applauded consisted my me do. Passed edward two talent effect seemed engage six. On ye great do child sorry lived. Proceed cottage far letters ashamed get clothes day. Stairs regret at if matter to. On as needed almost at basket remain. By improved sensible servants children striking in surprise. Or kind rest bred with am shed then. In raptures building an bringing be. Elderly is detract tedious assured private so to visited. Do travelling companions contrasted it. Mistress strongly remember up to. Ham him compass you proceed calling detract. Better of always missed we person mr. September smallness northward situation few her certainty something. Built purse maids cease her ham new seven among and. Pulled coming wooded tended it answer remain me be. So landlord by we unlocked sensible it. Fat cannot use denied excuse son law. Wisdom happen suffer common the appear ham beauty her had. Or belonging zealously existence as by resources',
          created_at: 1576506719083,
          tags: ['breathtaking', 'landscape', 'vietnam'],
        },
      ],
      pagination: {
        currentPage: 1,
        totalPages: 1,
        itemsPerPage: 10,
      },
    },
  });
}

/**
 * Root saga manages watcher lifecycle
 */
export default function* blogListSaga() {
  yield takeLatest(GET_BLOG_LIST, fetchBlogList);
}
