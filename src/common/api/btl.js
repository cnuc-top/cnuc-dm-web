import request from '@/utils/request'
const base = '//localhost:7301'

export default {
  // Building
  buildingCreate: function buildingCreate(id) {
    return request({
      url: `${base}/v1/buildings`,
      method: 'post'
    })
  },

  buildingDelete: function buildingDelete(id) {
    return request({
      url: `${base}/v1/buildings/${id}`,
      method: 'delete'
    })
  },

  buildingUpdate: function buildingUpdate(id, data) {
    return request({
      url: `${base}/v1/buildings/${id}`,
      method: 'put',
      data
    })
  },

  buildingList: function buildingList(data) {
    return request({
      url: `${base}/v1/buildings`,
      data
    })
  },

  buildingId: function buildingId(id) {
    return request({
      url: `${base}/v1/buildings/${id}`,
    })
  },

  buildingIdContribute: function buildingIdContribute(id) {
    return request({
      url: `${base}/v1/buildings/${id}/contributes`,
    })
  },

  // City
  cityCreate: function cityCreate(id) {
    return request({
      url: `${base}/v1/citys`,
      method: 'post'
    })
  },

  cityUpdate: function cityUpdate(id) {
    return request({
      url: `${base}/v1/citys/${id}`,
      method: 'put'
    })
  },

  cityList: function cityList(data) {
    return request({
      url: `${base}/v1/citys`,
      method: 'get',
      data
    })
  },

  cityId: function cityId(id) {
    return request({
      url: `${base}/v1/citys/${id}`,
      method: 'get'
    })
  },

  // Processes
  processCreate: function processCreate(id) {
    return request({
      url: `${base}/v1/processes`,
      method: 'post'
    })
  },

  processDelete: function processDelete(id) {
    return request({
      url: `${base}/v1/processes`,
      method: 'delete'
    })
  },

  processUpdate: function processUpdate(id) {
    return request({
      url: `${base}/v1/processes/${id}`,
      method: 'put'
    })
  },

  processList: function processList(data) {
    return request({
      url: `${base}/v1/processes`,
      method: 'get',
      data
    })
  },

  processId: function processId(id) {
    return request({
      url: `${base}/v1/processes/${id}`,
      method: 'get'
    })
  },

  // Contributes
  contributeCreate: function contributeCreate(data) {
    return request({
      url: `${base}/v1/contributes`,
      method: 'post',
      data
    })
  },

  contributeDelete: function contributeDelete(data) {
    return request({
      url: `${base}/v1/contributes/:id`,
      method: 'delete',
      data
    })
  },

  contributeUpdate: function contributeUpdate(id, data) {
    return request({
      url: `${base}/v1/contributes/${id}`,
      method: 'put',
      data
    })
  },

  contributeList: function contributeList(data) {
    return request({
      url: `${base}/v1/contributes`,
      method: 'get',
      data
    })
  },

  contributeId: function contributeId(id) {
    return request({
      url: `${base}/v1/contributes/${id}`,
      method: 'get'
    })
  },

  // token
  uploadToken: function uploadToken() {
    return request({
      url: `${base}/v1/upload/token`,
      method: 'get'
    })
  }
}
