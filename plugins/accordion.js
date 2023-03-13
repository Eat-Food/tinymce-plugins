/// reference "../src/tinymce/js/tinymce/tinymce.js"
tinymce.PluginManager.add("accordion", (editor, url) => {
  const isAccordion = (node) => {
    return node.classList.contains("accordion-widget");
  };

  const getAccordion = () => {
    const node = editor.selection.getNode(),
      parentNode = node.parentNode,
      grandNode = parentNode.parentNode;
    return isAccordion(node)
      ? node
      : isAccordion(parentNode)
      ? parentNode
      : isAccordion(grandNode)
      ? grandNode
      : null;
  };
//To add a simple triangle icon:
editor.ui.registry.addIcon('accordion', '<svg viewBox="0 0 1024 1024" version="1.1" xmlns="http://www.w3.org/2000/svg" width="24" height="24"><path d="M834 149H190c-19.882 0-36 16.118-36 36v138c0 19.882 16.118 36 36 36h644c19.882 0 36-16.118 36-36V185c0-19.882-16.118-36-36-36z m-36 72v66H226v-66h572zM834 407H190c-19.882 0-36 16.118-36 36v138c0 19.882 16.118 36 36 36h644c19.882 0 36-16.118 36-36V443c0-19.882-16.118-36-36-36z m-36 72v66H226v-66h572zM834 665H190c-19.882 0-36 16.118-36 36v138c0 19.882 16.118 36 36 36h644c19.882 0 36-16.118 36-36V701c0-19.882-16.118-36-36-36z m-36 72v66H226v-66h572z" fill="#595959" p-id="3965"></path></svg>');
  editor.ui.registry.addContextMenu('remove-accordion-menu-ctx', {
    update: (element) => {
        return !!getAccordion(element) ? 'remove-accordion-menu':''
    }
  });
  editor.ui.registry.addMenuItem('remove-accordion-menu',{
    icon: 'remove',
    text: 'Remove Accordion',
    onAction: () => {
        const acc = getAccordion();
        acc && acc.parentNode.removeChild(acc);
    }
  })
//   editor.ui.registry.addContextForm("remove-accordion", {
//     launch: {
//       type: "contextformbutton",
//       icon: "accordion",
//     },
//     predicate: isAccordion,
//     position: "node",
//     commands: [
//       {
//         type: "contextformbutton",
//         icon: "remove",
//         tooltip: "Remove Accordion",
//         onAction: (formApi) => {
//           const acc = getAccordion();
//           console.log(acc)
//           acc && acc.parentNode.removeChild(acc);
//           formApi.hide();
//           editor.focus();
//         },
//       },
//     ],
//   });

  editor.ui.registry.addButton("myCustomToolbarButton", {
    // text: "Accordion",
    icon: "accordion",
    tooltip:'Insert Accordion',
    onAction: () => {
      // editor.insertContent("&nbsp;<em>You clicked menu item 1!</em>");
      tinymce.activeEditor.windowManager.open({
        title: "Please Type Accordion Title",
        body: {
          type: "panel", // The root body type - a Panel or TabPanel
          items: [
            {
              type: "textarea", // component type
              name: "accordionTitle", // identifier
              placeholder: "title",
              maximized: false, // grow width to take as much space as possible
            },
          ],
        },
        buttons: [
          {
            type: "cancel",
            name: "closeButton",
            text: "Cancel",
          },
          {
            type: "submit",
            text: "OK",
          },
        ],
        onSubmit: (api) => {
          const data = api.getData();
          tinymce.activeEditor.execCommand(
            "mceInsertContent",
            false,
            `<div class="accordion-widget accordion-wrapper">
            <div class="accordion-header">
                <div class="accordion-title">${data.accordionTitle}</div>
            </div>
            <div class="accordion-body">
                <div class="accordion-content-wrapper"></div>
            </div>
            </div>
            <p>&nbsp;</p>`
          );
          api.close();
        },
      });
    },
  });
  return {
    getMetadata: () => ({
      name: "accordion plugin",
      url: "https://example.com/docs/customplugin",
    }),
  };
});
