import request from '@/utils/request'
const base = '//localhost:7301'

export default {
  // Building
  buildingCreate: function buildingCreate(data) {
    return request({
      url: `${base}/v1/buildings`,
      method: 'post',
      data
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
      params: data
    })
  },

  buildingId: function buildingId(id) {
    return request({
      url: `${base}/v1/buildings/${id}`
    })
  },

  buildingIdContribute: function buildingIdContribute(id) {
    return request({
      url: `${base}/v1/buildings/${id}/contributes`
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
      data
    })
  },

  cityId: function cityId(id) {
    return request({
      url: `${base}/v1/citys/${id}`
    })
  },

  // Svgfile
  svgfileCreate: function svgfileCreate(data) {
    return request({
      url: `${base}/v1/svgfiles`,
      method: 'post',
      data
    })
  },

  svgfileDelete: function svgfileDelete(id) {
    return request({
      url: `${base}/v1/svgfiles/${id}`,
      method: 'delete'
    })
  },

  svgfileUpdate: function svgfileUpdate(id, data) {
    return request({
      url: `${base}/v1/svgfiles/${id}`,
      method: 'put',
      data
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
      data
    })
  },

  processId: function processId(id) {
    return request({
      url: `${base}/v1/processes/${id}`
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
      data
    })
  },

  contributeId: function contributeId(id) {
    return request({
      url: `${base}/v1/contributes/${id}`
    })
  },

  // token
  uploadToken: function uploadToken() {
    return request({
      url: `${base}/v1/upload/token`
    })
  }
}
