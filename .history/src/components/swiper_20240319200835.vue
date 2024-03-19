<template>
    <!-- Make a div wrapped slider,set height and width -->
     <div style="width:100%;margin:20px auto;height:400px">
          <!-- Using the slider component -->
          <slider ref="slider" :options="options">
              <!-- slideritem wrapped package with the components you need -->
              <slideritem v-for="(item,index) in someList" :key="index" :style="item.style">{{item.html}}</slideritem>
              <!-- Customizable loading -->
              <div slot="loading">loading...</div>
          </slider>
     </div>
    </template>
    <script>
    // import slider components
    import { slider, slideritem } from 'vue-concise-slider'
    export default {
       el: '#app',
       data () {
          return {
            //data list [array]
            someList:[
              {
                html: 'slide1',
                style: {
                  'background': '#1bbc9b'
                }
              },
              {
                html: 'slide2',
                style: {
                  'background': '#4bbfc3'
                }
              },
              {
                html: 'slide3',
                style: {
                  'background': '#7baabe'
                }
              }
            ],
            //Slider configuration [obj]
            options: {
              currentPage: 0,
              itemAnimation: true,
              centeredSlides: true,
              loopedSlides: 2,
              slidesToScroll: 1
            }
          }
        },
        components: {
          slider,
          slideritem
        }
    }
    </script>
    <style scoped>
    .slider-item {
        transform:scale(0.8);
        transition-timing-function: ease;
        transition-duration: 300ms;
      }
      .slider-item.slider-active {
        transform:scale(1.0);
        z-index: 999;
      }
      .slider-item.slider-active-copy {
        transform:scale(1.0);
        z-index: 999;
      }
    </style>