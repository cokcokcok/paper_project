#include <stdio.h>
int spawn(){
    for(int i=0;i<5;i++)
    {
        printf("unit,");
    }
}
int main() {
    int call=spawn();
	return 0;
}
