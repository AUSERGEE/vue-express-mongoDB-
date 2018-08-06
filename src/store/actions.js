import axios from 'axios'

const actions={
	a_modifyTwoKey:({commit},data)=>{
        
       getSellData().then((res)=>{
         	commit('m_modifyKey2',res.data.data.aa)
        }).then(()=>{
        	commit('m_modifyKey1',data.key1)
       })
	}
}

function getSellData(){
	return axios.get('/api/seller').then((res)=>{
		return Promise.resolve(res)
	})
}

export default actions