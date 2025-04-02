import { addEvent } from "./eventManager";

export function createElement(vNode) {
  // let isVnodeArray = false;
  if (vNode === null || vNode === undefined || typeof vNode === "boolean") {
    return document.createTextNode("");
  }
  if (typeof vNode === "string" || typeof vNode === "number") {
    return document.createTextNode(vNode.toString());
  }

  // 배열일때..
  if (Array.isArray(vNode)) {
    // isVnodeArray = true;
    // 프래그먼트(가상돔)로 구현
    let fragment = document.createDocumentFragment();

    vNode.forEach((child) => {
      //   let element = document.createElement();
      fragment.appendChild(createElement(child));
    });
    return fragment;
    // createElement();
  }
  //   else {
  //     // 일반 vnode객체를 dom요소로 변환하는 로직을 넣으면 되니 ?
  //     if (typeof vNode.type === "string") {
  //       const element = document.createElement(vNode.type);
  //       if (vNode.children) {
  //         element.appendChild(document.createTextNode(vNode.children[0]));
  //       }
  //       return element;
  //     }
  //   }

  // 일반 vNode 객체 처리
  if (vNode.type) {
    if (typeof vNode.type === "function") {
      throw new Error(
        "컴포넌트는 normalizeVNode로 정규화한 후 처리해야 합니다.",
      );
    }

    // 일반 DOM 요소 처리
    if (typeof vNode.type === "string") {
      const element = document.createElement(vNode.type);

      // props 처리
      if (vNode.props) {
        updateAttributes(element, vNode.props);
      }

      // children 처리
      if (vNode.children) {
        if (Array.isArray(vNode.children)) {
          // vNode.children
          //     .map(createElement)
          //     .forEach((child) => element.appendChild(child));

          vNode.children.forEach((child) => {
            element.appendChild(createElement(child));
          });
        } else {
          element.appendChild(createElement(vNode.children));
          // element.appendChild(document.createTextNode(vNode.children[0]));
          //   element.appendChild(createElement(vNode.children));
        }
      }

      return element;
    }
  }
}

function updateAttributes($el, props) {
  Object.entries(props).forEach(([key, value]) => {
    // if (key === "style") {
    // }
    // if (eky === "className") {
    // }
    // if (key === key.startsWith("on") && typeof value === "function") {
    // }
    // // 나머지
    // $el.setAttribute(key, value);

    //  나중에 리펛토링 하기..
    if (key === "className") {
      $el.setAttribute("class", value);
    } else if (key === "id") {
      $el.setAttribute(key, value);
    } else if (key === "disabled") {
      $el.setAttribute(key, value);
    } else if (key.startsWith("data-")) {
      $el.setAttribute(key, value);
    } else if (key.startsWith("on")) {
      //이벤트 리스너 add이벤트를 통해서.. 다른 곳에 핸들러를 저장한다..
      const eventType = key.substring(2);

      addEvent($el, eventType.toLowerCase(), value);
      // $el.setAttribute(key, value);
    }
  });
  // $el.setAttribute("id", props.id);
}
