var gammaTable = [ 0,
  0.000005077051900661759,
  0.000023328004666098932,
  0.0000569217657121931,
  0.00010718736234124402,
  0.0001751239775030267,
  0.00026154375454849144,
  0.0003671362698159426,
  0.0004925037871914326,
  0.0006381828421670219,
  0.0008046584995130583,
  0.0009923743040743253,
  0.0012017395224384016,
  0.001433134589671864,
  0.0016869153167892836,
  0.0019634162133964697,
  0.002262953160706434,
  0.002585825596234168,
  0.0029323183239383624,
  0.003302703032003638,
  0.0036972395789001307,
  0.004116177093282753,
  0.00455975492252602,
  0.005028203456855535,
  0.0055217448502396585,
  0.006040593654849813,
  0.006584957382581685,
  0.007155037004573032,
  0.00775102739766061,
  0.008373117745148581,
  0.009021491898012131,
  0.009696328701658229,
  0.010397802292555288,
  0.011126082368383245,
  0.011881334434813665,
  0.012663720031582098,
  0.013473396940142641,
  0.014310519374884064,
  0.015175238159625197,
  0.016067700890886875,
  0.016988052089250045,
  0.017936433339950233,
  0.018912983423721504,
  0.01991783843878572,
  0.020951131914781092,
  0.02201299491933654,
  0.023103556157921437,
  0.02422294206753424,
  0.025371276904734584,
  0.026548682828472916,
  0.027755279978126032,
  0.028991186547107816,
  0.030256518852388652,
  0.03155139140022645,
  0.03287591694838383,
  0.03423020656508195,
  0.03561436968491877,
  0.0370285141619602,
  0.03847274632019464,
  0.03994717100152558,
  0.04145189161146246,
  0.042987010162657116,
  0.04455262731642138,
  0.04614884242235095,
  0.04777575355617064,
  0.04943345755590796,
  0.051122050056493396,
  0.05284162552287903,
  0.05459227728176034,
  0.05637409755197975,
  0.05818717747368543,
  0.06003160713631323,
  0.06190747560545576,
  0.06381487094867724,
  0.06575388026033009,
  0.06772458968542432,
  0.0697270844425988,
  0.07176144884623908,
  0.07382776632778461,
  0.07592611945626479,
  0.07805658995810189,
  0.08021925873621505,
  0.08241420588845923,
  0.08464151072542946,
  0.08690125178766034,
  0.08919350686224782,
  0.09151835299891949,
  0.09387586652557776,
  0.09626612306333969,
  0.09868919754109445,
  0.10114516420959989,
  0.10363409665513738,
  0.1061560678127439,
  0.10871114997903854,
  0.11129941482466024,
  0.11392093340633272,
  0.11657577617857154,
  0.11926401300504741,
  0.12198571316961948,
  0.1247409453870513,
  0.12752977781342206,
  0.13035227805624436,
  0.1332085131842997,
  0.13609854973720245,
  0.1390224537347025,
  0.14198029068573553,
  0.14497212559723088,
  0.14799802298268516,
  0.15105804687051058,
  0.15415226081216518,
  0.1572807278900734,
  0.16044351072534352,
  0.16364067148528988,
  0.1668722718907655,
  0.1701383732233124,
  0.173439036332135,
  0.17677432164090326,
  0.18014428915439032,
  0.18354899846495082,
  0.18698850875884424,
  0.1904628788224093,
  0.19397216704809314,
  0.19751643144034023,
  0.20109572962134564,
  0.20471011883667684,
  0.20835965596076741,
  0.2120443975022877,
  0.215764399609395,
  0.2195197180748679,
  0.22331040834112742,
  0.2271365255051489,
  0.23099812432326744,
  0.23489525921588023,
  0.2388279842720483,
  0.24279635325400195,
  0.24680041960155044,
  0.25084023643640047,
  0.2549158565663851,
  0.25902733248960613,
  0.2631747163984916,
  0.267358060183772,
  0.2715774154383751,
  0.27583283346124515,
  0.2801243652610849,
  0.28445206156002445,
  0.2888159727972186,
  0.29321614913237454,
  0.2976526404492112,
  0.30212549635885283,
  0.3066347662031576,
  0.31118049905798434,
  0.3157627437363971,
  0.3203815487918104,
  0.3250369625210763,
  0.3297290329675149,
  0.33445780792388924,
  0.3392233349353267,
  0.34402566130218676,
  0.348864834082879,
  0.35374090009662945,
  0.3586539059261989,
  0.36360389792055325,
  0.36859092219748707,
  0.37361502464620194,
  0.37867625092984036,
  0.3837746464879752,
  0.38891025653905886,
  0.39408312608282897,
  0.39929329990267437,
  0.4045408225679618,
  0.40982573843632336,
  0.41514809165590655,
  0.42050792616758714,
  0.42590528570714575,
  0.4313402138074096,
  0.4368127538003594,
  0.4423229488192018,
  0.4478708418004099,
  0.4534564754857306,
  0.4590798924241601,
  0.4647411349738896,
  0.4704402453042184,
  0.4761772653974402,
  0.4819522370506978,
  0.48776520187781053,
  0.49361620131107364,
  0.4995052766030301,
  0.505432468828216,
  0.5113978188848795,
  0.5174013674966733,
  0.5234431552143247,
  0.5295232224172772,
  0.5356416093153108,
  0.5417983559501369,
  0.5479935021969718,
  0.5542270877660852,
  0.5604991522043282,
  0.5668097348966382,
  0.5731588750675233,
  0.5795466117825252,
  0.5859729839496614,
  0.5924380303208466,
  0.598941789493296,
  0.6054842999109072,
  0.6120655998656237,
  0.6186857274987796,
  0.6253447208024265,
  0.6320426176206414,
  0.6387794556508168,
  0.6455552724449345,
  0.6523701054108211,
  0.6592239918133873,
  0.6661169687758508,
  0.6730490732809419,
  0.6800203421720954,
  0.6870308121546249,
  0.6940805197968822,
  0.7011695015314021,
  0.7082977936560323,
  0.7154654323350483,
  0.7226724536002546,
  0.7299188933520705,
  0.7372047873606051,
  0.744530171266715,
  0.7518950805830509,
  0.7592995506950911,
  0.7667436168621613,
  0.7742273142184416,
  0.7817506777739623,
  0.7893137424155858,
  0.7969165429079781,
  0.8045591138945669,
  0.8122414898984895,
  0.8199637053235279,
  0.8277257944550337,
  0.8355277914608409,
  0.8433697303921693,
  0.8512516451845149,
  0.8591735696585323,
  0.8671355375209048,
  0.8751375823652049,
  0.8831797376727453,
  0.8912620368134188,
  0.8993845130465294,
  0.907547199521614,
  0.9157501292792527,
  0.9239933352518732,
  0.9322768502645428,
  0.940600707035753,
  0.9489649381781952,
  0.9573695761995268,
  0.9658146535031301,
  0.9743002023888613,
  0.9828262550537913,
  0.9913928435929399,
  1
];
