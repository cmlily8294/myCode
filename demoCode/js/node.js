//递归查找html
const getFileList = (dir) => {
  let fileList = fs.readdirSync(path.resolve(__dirname, dir));
  fileList.forEach((fileName) => {
    const filePath = path.join(dir,fileName);
    const stats = fs.statSync(path.resolve(__dirname, filePath));
    if (stats.isFile() && fileName.indexOf('.html') != -1) {
      //入口文件名称
      const entryName = fileName.substring(fileName.lastIndexOf('.html'),-1);
      const HTMLPlugin = new HTMLWebpackPlugin({
        filename: fileName,
        template: path.resolve(__dirname, filePath),
        chunks: [entryName, 'vendor']
      });
      HTMLPlugins.push(HTMLPlugin);
      // 与当前html文件同名的js文件作为入口文件
      Entries[entryName] = path.resolve(__dirname, `${dir}/${entryName}.js`);
    } else if (stats.isDirectory()) {
      getFileList(filePath);
    }
  });
}