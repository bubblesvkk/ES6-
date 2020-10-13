var that;
class Tab{
    constructor(id) {
    //    获取元素
        that = this;
        this.main = document.querySelector(id);
        //原来的方法不行？
        // this.lis = this.main.getElementsByTagName('li');
        this.lis = this.main.querySelectorAll('li');
        this.sections = this.main.querySelectorAll('section');
        this.add = this.main.querySelector('.tabadd');
        this.ul = this.main.querySelector('.firstnav ul:first-child');
        this.fsection = this.main.querySelector('.tabscon');
        this.init();
    }
    init(){
        this.updateNode();
    //    init 初始化操作让相关的元素绑定事件
        this.add.onclick = this.addTab;
        for(var i =0;i<this.lis.length;i++){
            this.lis[i].index = i;
            this.lis[i].onclick = this.toggleTab;
            this.remove[i].onclick = this.removeTab;
            this.spans[i].ondblclick= this.editTab;
            this.sections[i].ondblclick= this.editTab;
        }

    }
    updateNode(){
        //    获取所有的小li和section 以便添加时能够重新更新
        //动态添加元素 需要重新获取对应的元素
        this.lis = this.main.querySelectorAll('li');
        this.sections = this.main.querySelectorAll('section');
        this.remove = this.main.querySelectorAll('.icon-guanbi');
        this.spans = this.main.querySelectorAll('.firstnav li span:first-child')
    }

    //切换功能
    toggleTab(){
        // console.log(this.index);
        that.clearClass();
        this.className = 'liactive';
        that.sections[this.index].className = 'conactive';
    }
    clearClass(){
        for(var i = 0;i<this.lis.length;i++){
            this.lis[i].className = 'tab';
            this.sections[i].className = 'sec';
        }
    }
//    添加功能

    addTab(){
        that.clearClass();
        var random = Math.random();
         var li = '<li class="tab liactive"><span>新选项</span><span class="iconfont icon-guanbi"></span></li>';
         var section = '<section class="sec conactive">测试1'+random +'</section>';
         that.ul.insertAdjacentHTML('beforeend',li);
         that.fsection.insertAdjacentHTML('beforeend',section);
         that.init();
    }

//    删除功能
    removeTab(e){
        //    点击关闭 会到切换 要有阻止冒泡
        e.stopPropagation();
        var index = this.parentNode.index;
        console.log(index);
        that.lis[index].remove();
        that.sections[index].remove();
        that.init();
    //    如果删除的不是选定状态的li的时候，原来的选中对象的li保持不变
    //    即当前有的li是已经处于选中状态 就return
        if(document.querySelector('.liactive')) return;
    //    当删除了选定状态的这个li 让它的前一个li处于选定状态
        index--;
        //手动调用点击事件 不需要鼠标触发
        //有index再执行点击 没有就不执行
        that.lis[index]&&that.lis[index].click();


    }

//    修改功能
    editTab(){
        var str = this.innerHTML;
    //   双击禁止选定文字
        window.getSelection ? window.getSelection().removeAllRanges() : document.selection.empty();
        // alert(11);
        this.innerHTML = '<input type="text" size="6"/>'
        var input = this.children[0];
        input.value = str;
        input.select();
    //当离开文本框就把文本框里面的值传给span
        input.onblur = function () {
          this.parentNode.innerHTML = this.value;
        }
        input.onkeyup = function(e){
            if(e.keyCode ===13){
                //手动调用失去焦点的操作
                this.blur();
            }
        }
    }


}

new Tab('#tab');
