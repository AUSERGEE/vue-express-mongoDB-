import jsonp from 'common/js/jsonp'
import axios from 'axios'

export function getRecomment(){
  const url = 'https://c.y.qq.com/musichall/fcgi-bin/fcg_yqqhomepagerecommend.fcg'
  const data = {
    g_tk: 5381,
    inCharset: 'utf-8',
    outCharset: 'utf-8',
    notice: 0,
    format: 'jsonp',
    platform: 'h5',
    uin: 0,
    needNewCode: 1
  }
  const options = {
    param: 'jsonpCallback',
    prefix: 'jp'
  }
  return jsonp(url, data, options)
}

export function getDiscList(){
	const url = '/api/getDiscList'
	const data = {
	g_tk: 5381,
	inCharset: 'utf-8',
	outCharset: 'utf-8',
	notice: 0,
	platform: 'yqq',
	hostUin: 0,
	sin: 0,
	ein: 29,
	sortId: 5,
	needNewCode: 0,
	categoryId: 10000000,
	rnd: Math.random(),
	format: 'json'
	}
	return axios.get(url,{
		params:data
	}).then((res=>{
		return Promise.resolve(res.data)
	}))
}

export function getCatalog(){
  const url = 'https://c.y.qq.com/v8/fcg-bin/v8.fcg'
  const data = {
    inCharset: 'utf-8',
    outCharset: 'utf-8',
    notice: 0,
    format: 'jsonp',
    channel: 'singer',
    page: 'list',
    key: 'all_all_all',
    pagesize: 100,
    pagenum: 1,
    hostUin: 0,
    needNewCode: 0,
    platform: 'yqq',
    g_tk: 759768811
  }
  const options = {
    param: 'jsonpCallback',
    prefix: 'jp'
  }
  return jsonp(url,data,options)
}