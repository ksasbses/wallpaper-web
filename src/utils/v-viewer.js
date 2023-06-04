import Vue from 'vue' 
import Viewer from 'v-viewer' 
import 'viewerjs/dist/viewer.css'  
 
Vue.use(Viewer) 
Viewer.setDefaults({ 'inline': false, //启用inline模式     
'button': true, //显示右上角关闭按钮     
'navbar': true, //显示缩略图导航     
'title': true, //显示当前图片的标题     
'toolbar': true, //显示工具栏     
'tooltip': true, //显示缩略百分比     
'movable': true, //图片是否可移动     
'zoomable': true, //图片是否可缩放     
'rotatable': true, //图片是否可旋转     
'scalable': true, //图片是否可反转     
'transition': true, //使用css3过度     
'fullscreen': true, //播放时是否全屏     
'keyboard': true, // 是否支持键盘   
})