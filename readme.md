i,a,o = insert mode

i - before char
a - after char
o - next line

shift+i - beginning of the line
shift+a - end of the line
shift+o - line above inserted

//------------------------------------

esc = back to normal mode

h - left arrow
l - right arrow
j - up arrow
k - down arrow

any number with h,l,j,k etc will move it that time

//---------------------------------------

change to relative line numbers in vscode

//---------------------------------------

u - for undoing things
ctrl + r - for redoing things

//---------------------------------------

visual mode

d - delete
y - copying
p - pasting

dd - delete the whole line
cc - delete the line and be in the same line in insert mode
c - delete the selected and go in insert mode yy - copy the whole line
shift+d - delete the rest of the line

shift+c - changes the rest of the line

shift+p - paste above the line

//---------------------------------------------------

if not selected the new line char at end of line
: p - paste after the char and shift+p paster before char

//----------------------------------------------------

r - to replace a character
w - to jump to the next word
b - to jump to prev word

dw - deletes a word
2dw - delete 2 words
diw - delete in a word
e - moves to end of a word
0 - goes to beginning of line
$ - goes to the end of the line

do - everything from beginning is deleted
d$ - everthing till end is deleted

yiw - yank/copy inner word

{

    yi" - copy everything inside ""
    di" - delete inside ""
    ci" - delete and enter insert inside ""

} - same can be done with [], {}, etc

% - takes to the closing bracket of {}
