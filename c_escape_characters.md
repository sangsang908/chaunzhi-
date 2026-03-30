# C 语言中常见的转义字符

转义字符（Escape Character）以反斜杠 `\` 开头，用于表示一些无法直接输入或具有特殊含义的字符。

## 常见转义字符列表

| 转义字符 | 含义 | ASCII 值（十进制） |
|----------|------|-------------------|
| `\n`     | 换行（Newline） | 10 |
| `\t`     | 水平制表符（Horizontal Tab） | 9 |
| `\r`     | 回车（Carriage Return） | 13 |
| `\b`     | 退格（Backspace） | 8 |
| `\f`     | 换页（Form Feed） | 12 |
| `\v`     | 垂直制表符（Vertical Tab） | 11 |
| `\a`     | 响铃（Alert/Bell） | 7 |
| `\\`     | 反斜杠（Backslash） | 92 |
| `\'`     | 单引号（Single Quote） | 39 |
| `\"`     | 双引号（Double Quote） | 34 |
| `\?`     | 问号（Question Mark） | 63 |
| `\0`     | 空字符（Null Character） | 0 |

## 数值转义字符

除上述字符外，C 语言还支持用数值直接表示任意字符：

| 形式 | 说明 | 示例 |
|------|------|------|
| `\ooo` | 八进制数值（1~3 位） | `\101` 表示字母 `A` |
| `\xhh` | 十六进制数值（1~2 位） | `\x41` 表示字母 `A` |

## 使用示例

```c
#include <stdio.h>

int main() {
    // \n 换行
    printf("Hello\nWorld\n");

    // \t 制表符
    printf("Name\tAge\n");
    printf("Alice\t30\n");

    // \\ 输出反斜杠
    printf("Path: C:\\Users\\Alice\n");

    // \" 在字符串中输出双引号
    printf("He said: \"Hello!\"\n");

    // \0 空字符（字符串结束符）
    char str[] = {'H', 'i', '\0'};
    printf("%s\n", str);

    // 八进制和十六进制
    printf("%c\n", '\101');   // 输出 A（八进制）
    printf("%c\n", '\x41');   // 输出 A（十六进制）

    return 0;
}
```

### 输出结果

```
Hello
World
Name    Age
Alice   30
Path: C:\Users\Alice
He said: "Hello!"
Hi
A
A
```

## 注意事项

1. **`\0` 与 `\n` 的区别**：`\0` 是空字符（值为 0），是 C 字符串的结束标志；`\n` 是换行符（值为 10）。
2. **单引号中的转义**：字符常量使用单引号，例如 `'\n'`、`'\t'`。
3. **八进制转义**：`\0` 到 `\377`，超出范围编译器会警告。
4. **十六进制转义**：`\x` 后跟一个或多个十六进制数字，注意不要溢出 `char` 类型范围。
5. **`\?`**：用于避免三字符组（trigraph）歧义，现代编译器中较少使用。
