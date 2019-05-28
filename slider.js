let slider = Vue.component('slider', {
  data: function () {
    return {
      slider:null,        //滚动条DOM元素
      thunk:null,         //拖拽DOM元素
      per:this.value,     //当前值
    }
  },
  props:['min','max','value'],
  template: `
    <div class="slider w-100" ref="slider">
      <div class="process" ref="process"></div>
      <div class="thunk" ref="trunk">
      </div>
    </div>
  `,
  mounted(){
    let self = this;
    this.slider = this.$refs.slider;
    this.process = this.$refs.process;
    this.thunk = this.$refs.trunk;
    // var _this = this;
    this.thunk.onmousedown = function (e) {
      var e = e || window.event;
      var leftVal = e.clientX - self.thunk.offsetLeft;
      // 拖动一定写到 down 里面才可以
      document.onmousemove = function(event){
        var event = event || window.event;
        let barleft = event.clientX - leftVal;
        if(barleft < 0)
            barleft = 0;
        else if(barleft > self.slider.offsetWidth - self.thunk.offsetWidth)
            barleft = self.slider.offsetWidth - self.thunk.offsetWidth;
        self.process.style.width = barleft +'px' ;
        self.thunk.style.marginLeft = barleft + "px";
        self.per = barleft/(self.slider.offsetWidth-self.thunk.offsetWidth);
        self.$emit('update:value', self.per * self.max);
        //防止选择内容--当拖动鼠标过快时候，弹起鼠标，bar也会移动，修复bug
        window.getSelection ? window.getSelection().removeAllRanges() : document.selection.empty();
      }
      document.onmouseup = function(){
        document.onmousemove = document.onmouseup = null;
      }
      return false;
    };
    // this.init();
  },
  computed: {
  },
  methods:{
    init: function () {
      console.log(this.value);
    }
  }
});

export {
  slider
}