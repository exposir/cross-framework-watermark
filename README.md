# Vue & React 水印组件

## 简介

该仓库提供了用于 Vue 和 React 的 **水印组件**。这是一个轻量级解决方案，用于在任何 Vue 或 React 项目中快速添加水印。

### 项目特点

1. **跨框架支持**: 本项目提供了 Vue 和 React 两个版本的水印组件，广泛适用于不同的前端框架环境。
2. **性能优化**: 通过防抖逻辑 (**`debounce`**) 优化了水印绘制函数，有效减少不必要的重绘和计算。
3. **动态适应**: 水印组件能够根据父容器的尺寸自动调整，同时支持窗口缩放和 DOM 变化。
4. **可定制性**: 支持通过 **`props`** (React) 或者组件属性 (Vue) 自定义水印文本和其他样式选项。
5. **无侵入性**: 水印层通过设置 **`pointerEvents: 'none'`** 确保了不会干扰用户与页面其他元素的交互。
6. **生命周期管理**: 在 Vue 和 React 版本中都合理地使用了生命周期钩子或者 **`useEffect`** 进行资源的初始化和清理。
7. **模块化封装**: 所有的逻辑和样式都封装在独立的组件中，易于维护和复用。
8. **响应式**: Vue 版本通过 **`watch`**，React 版本通过 **`useEffect`** 实现水印文本的响应式更新。
9. **观察者模式**: 使用 **`MutationObserver`** 和 **`ResizeObserver`** 监听 DOM 和尺寸变化，确保水印与内容保持一致。
10. **代码质量**: 项目代码简洁、注释充分，方便其他开发者理解和贡献。

### React 组件特点

1. **可自定义水印文本**: 可以通过 **`text`** 属性传入自定义的水印文本。
2. **用 Canvas 绘制水印**: 利用 Canvas API 来进行水印文本的绘制。
3. **动态颜色与样式**: 使用了动态的文本样式（固定为 '30px Arial'）和颜色（设置为 'rgba(0, 0, 0, 0.7)'）。
4. **相对父容器定位**: 水印会依据其父容器的尺寸进行定位和绘制。
5. **响应式**: 使用了 **`window.addEventListener('resize', onResize);`** 和 **`ResizeObserver`** ，以确保在窗口或父容器大小变化时重新绘制水印。
6. **DOM 观察**: 使用**`MutationObserver`**来观察父容器的 DOM 变化，如果有子元素添加或删除，会重新绘制水印。
7. **防抖优化**: 利用 lodash 库中的 **`debounce`** 函数，优化了 **`draw()`** 函数，防止在短时间内频繁触发。
8. **自动清理**: 在 **`useEffect`** 的返回函数中进行事件监听和观察者的清理，避免内存泄漏。
9. **非阻塞性**: 通过设置 **`pointerEvents: 'none'`**，确保 canvas 不会阻止与下层 DOM 元素的交互。

### Vue 组件特点

1. **Vue Composition API**: 利用 Vue 3 的 Composition API，具体使用了 **`ref`**, **`onMounted`**, **`onUnmounted`**, 和 **`watch`**。
2. **可自定义水印文本**: 通过 **`props`** 接收一个 **`text`** 属性，以自定义水印文本。
3. **Canvas 绘制**: 同样使用 Canvas API 进行水印绘制。
4. **动态样式和颜色**: 设定了字体（'30px Arial'）和颜色（'rgba(0, 0, 0, 0.7)'）。
5. **相对父容器定位**: 水印大小和位置是根据父容器来动态调整的。
6. **响应式设计**: 当窗口或父容器大小改变时，组件会重新绘制水印。
7. **DOM 观察**: 使用 **`MutationObserver`** 来观察父容器的 DOM 变化，并据此重新绘制水印。
8. **防抖优化**: 使用了 lodash 的 **`debounce`** 来优化 **`draw`** 函数。
9. **生命周期管理**: 在 **`onMounted`** 和 **`onUnmounted`** 钩子中进行初始化和清理工作。
10. **文本监听**: 使用 **`watch`** 来监听 **`props.text`** 的变化，如果文本改变则重新绘制水印。
11. **非阻塞性**: 通过设置 **`pointerEvents: 'none'`**，确保 canvas 不会干扰与底层 DOM 元素的交互。

这样的总结能让开发者快速地了解到这个 Vue 组件的各种优点和功能，从而更容易做出是否要使用这个组件的决策。

## 安装

```bash
npm install your-package-name
```

## 使用方式

### React

```jsx
import Watermark from "your-package-name/react";

<Watermark text="My Watermark">{/* Your content here */}</Watermark>;
```

### Vue

在你的 Vue 组件中：

```html
<YourWatermarkComponent :text="'My Watermark'">
  <!-- Your content here -->
</YourWatermarkComponent>
```

## API

### Props

| 属性 | 类型   | 默认值              | 描述           |
| ---- | ------ | ------------------- | -------------- |
| text | String | 'Default Watermark' | 水印的文本内容 |

## 示例

你可以在 **`examples/`** 目录下找到更多的 Vue 和 React 示例。

## 贡献

欢迎提交 Pull Request 或提出 Issue。

## 许可

该项目使用 MIT 许可。
