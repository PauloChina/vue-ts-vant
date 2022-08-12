const baseapi = 'http://106.15.199.61:3000/api/'
// const baseapi = 'http://localhost:3000/api/'
export default {
  hupuSummary: baseapi + 'getHupuSummary',
  hupuVoices: baseapi + 'getHupuVoices',
  hupuTopics: baseapi + 'getHupuTopics',
  hupuBbsDetail: baseapi + 'getHupuBbsDetail',
  hupuVoiceDetail: baseapi + 'getHupuVoiceDetail',
  hupuBbsComments: baseapi + 'getHupuBbsComments',
}
