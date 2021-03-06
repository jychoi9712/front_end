import axios from 'axios'
import _uniqBy from 'lodash/uniqBy'

const defaultMessage = 'Search for the movie title'

export default {
    // module
    namespaced: true,

    // data
    // state: function(){
    //     return {
    //         movies: []
    //     }
    // },
    state: () => ({
        movies: [],
        message: defaultMessage,
        loading: false,
        theMovie: {}
    }),

    // computed
    getters: {
        // movieIds(state) {
        //     return state.movies.map(m=>m.imdbID)
        // }
    },

    // methods
    // 변이 (mutations에서만 데이터의 변경이 가능!)
    mutations: {
        updateState(state, payload) {
            // 객체데이터의 속성 이름만으로 배열만드는 메소드
            // ['movies', 'message','loading']
            Object.keys(payload).forEach(key=>{
                state[key] = payload[key]
                // state.movies = payload.movies
                // state.message = payload.message
                // state.loading = payload.loading
            })
        },
        resetMovies(state){
            state.movies = []
            state.message = defaultMessage
            state.loading = false
        }
    },
    // 비동기 동작
    actions: {
        // searchMovies(context){
        //     context.state
        //     context.getters
        //     context.commit

        // }
        // async searchMovies(context, payload){
        async searchMovies({state,commit}, payload){
            if(state.loading){
                return 
            }

            commit('updateState', {
                message: '',
                loading: true
            })

            try{
                const res = await _fetchMovie({
                    ...payload,
                    page: 1
                })
                const { Search, totalResults } = res.data
                // context.commit('updateState',{
                commit('updateState',{
                    movies: _uniqBy(Search,'imdbID')
                    // message: res.data.message
                    // loading: true
                })
                console.log(totalResults)
                console.log(typeof totalResults)

                const total = parseInt(totalResults,10)
                const pageLength = Math.ceil(total/10)
                
                // 추가 요청!
                if(pageLength > 1){
                    for(let page = 2; page<=pageLength; page += 1){
                        if(page > (payload.number / 10))
                            break
                        
                        const res = await _fetchMovie({
                            ...payload,
                            // page: page
                            page
                        })
                        const {Search}=res.data
                        commit('updateState',  {
                            movies: [...state.movies, ..._uniqBy(Search,'imdbID')]
                        })
                    }
                }
            //General code!
            // }catch(message){
                // commit('updateState',{
                    // movies: [],
                    // message
                // })
            
            // Netlify serverless code!
            }catch(error){
            // }catch( {message} ){
                commit('updateState',{
                    movies: [],
                    message: error.message
                    // message
                })
            } finally {
                commit('updateState', {
                   loading: false 
                })
            }
        },
        async searchMovieWithId({state,commit},payload){
            if(state.loading){
                return
            }
                
            commit('updateState', {
                theMovie: {},
                loading: true
            })

            try{
                const res = await _fetchMovie(payload)
                commit('updateState', {
                    theMovie: res.data
                })
            }catch(err){
                commit('updateState',{
                    theMovie: {}
                })
            }finally{
                commit('updateState',{
                    loading:false
                })
            }
        }
    }

}


// General code!
// function _fetchMovie(payload) {
    // const {title, type, year, page, id} = payload
    // const OMDB_API_KEY = "7035c60c"
    // const url = id 
    //     ? `https://www.omdbapi.com/?apikey=${OMDB_API_KEY}&i=${id}` 
    //     :`https://www.omdbapi.com/?apikey=${OMDB_API_KEY}&s=${title}&type=${type}&y=${year}&page=${page}`
    
    // return new Promise((resolve,reject)=>{
    //     axios.get(url)
    //         .then(res=>{
    //             if(res.data.Error){
    //                 reject(res.data.Error)
    //             }
    //             resolve(res)
    //         })
    //         .catch(err => {
    //             reject(err.message)
    //         })
    // })
// }


// Netlify Serverless functions code!
async function _fetchMovie(payload) {
    return await axios.post('/.netlify/functions/movie', payload)
}