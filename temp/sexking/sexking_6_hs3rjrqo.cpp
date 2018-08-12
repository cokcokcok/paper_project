#include <stdio.h>

int main() {
    
    int size = 2;
    int array[size] = {'w','a'};
    
    for(int num = 0; size > num; num++){
        printf("$d,", array[num]);
    }
    return 0;
}
